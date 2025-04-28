export class Transaction {
  sender: string;
  receiver: string;
  itemOffered: string;
  itemRequested: string;
  status: string;

  constructor(sender: string, receiver: string, itemOffered: string, itemRequested: string) {
    this.sender = sender;
    this.receiver = receiver;
    this.itemOffered = itemOffered;
    this.itemRequested = itemRequested;
    this.status = "pending";
  }

  validateTransaction(): boolean {
    if (!this.sender || !this.receiver || !this.itemOffered || !this.itemRequested) {
      return false;
    }
    return true;
  }

  completeTransaction(): void {
    if (this.validateTransaction()) {
      this.status = "completed";
    } else {
      throw new Error("Transaction validation failed");
    }
  }
}
