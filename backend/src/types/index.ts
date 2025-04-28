export interface User {
  id: string;
  name: string;
  wallet: number;
}

export interface Transaction {
  sender: string;
  receiver: string;
  itemOffered: string;
  itemRequested: string;
  status: "pending" | "completed" | "canceled";
}

export interface Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: any;
  hash: string;
}
