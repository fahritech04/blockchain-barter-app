import { Blockchain } from "./blockchain/blockchain";
import { User } from "./users/user";
import { Barter } from "./barter/barter";

class App {
  private blockchain: Blockchain;
  private users: User[];
  private barterSystem: Barter;

  constructor() {
    this.blockchain = new Blockchain();
    this.users = [];
    this.barterSystem = new Barter();
  }

  public addUser(id: string, name: string): User {
    const user = new User(id, name);
    this.users.push(user);
    return user;
  }

  public initiateBarter(sender: User, receiver: User, itemOffered: string, itemRequested: string) {
    const transaction = this.barterSystem.initiateBarter(sender, receiver, itemOffered, itemRequested);
    this.blockchain.addBlock(new (require("./blockchain/block").Block)(this.blockchain.getLatestBlock().index + 1, this.blockchain.getLatestBlock().hash, Date.now(), transaction));
  }

  public completeBarter(transaction: any) {
    this.barterSystem.completeBarter(transaction);
  }

  public getBarterHistory() {
    return this.barterSystem.getBarterHistory();
  }

  public getBlockchain() {
    return this.blockchain.getBlocks();
  }
}

const app = new App();

const user1 = app.addUser("1", "Alice");
const user2 = app.addUser("2", "Bob");

app.initiateBarter(user1, user2, "Book", "Pen");
console.log("Barter History:", app.getBarterHistory());
console.log("Blockchain:", app.getBlockchain());
