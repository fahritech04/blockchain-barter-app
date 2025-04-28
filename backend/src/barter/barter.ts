import { Transaction } from "./transaction";
import { User } from "../users/user";

export class Barter {
  private barterHistory: Transaction[];

  constructor() {
    this.barterHistory = [];
  }

  initiateBarter(sender: User, receiver: User, itemOffered: string, itemRequested: string): Transaction {
    const transaction = new Transaction(sender.id, receiver.id, itemOffered, itemRequested);
    if (transaction.validateTransaction()) {
      this.barterHistory.push(transaction);
      return transaction;
    } else {
      throw new Error("Transaction validation failed.");
    }
  }

  completeBarter(transaction: Transaction): void {
    const index = this.barterHistory.indexOf(transaction);
    if (index !== -1) {
      this.barterHistory[index].completeTransaction();
    } else {
      throw new Error("Transaction not found in barter history.");
    }
  }

  getBarterHistory(): Transaction[] {
    return this.barterHistory;
  }
}
