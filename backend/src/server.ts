import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Blockchain, Block } from "./blockchain/blockchain";
import { User } from "./users/user";
import { Barter } from "./barter/barter";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const blockchain = new Blockchain();
const users: User[] = [];
const barterSystem = new Barter();

app.post("/users", (req: Request, res: Response) => {
  const { id, name } = req.body;
  const user = new User(id, name);
  users.push(user);
  res.json(user);
});

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.post("/barter", (req: Request, res: Response) => {
  const { senderId, receiverId, itemOffered, itemRequested } = req.body;
  const sender = users.find((u) => u.id === senderId);
  const receiver = users.find((u) => u.id === receiverId);
  if (!sender || !receiver) return res.status(400).json({ error: "User not found" });
  try {
    const transaction = barterSystem.initiateBarter(sender, receiver, itemOffered, itemRequested);
    blockchain.addBlock(new Block(blockchain.getLatestBlock().index + 1, blockchain.getLatestBlock().hash, Date.now(), transaction));
    res.json(transaction);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/barter/history", (req: Request, res: Response) => {
  res.json(barterSystem.getBarterHistory());
});

app.get("/blockchain", (req: Request, res: Response) => {
  res.json(blockchain.getBlocks());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
