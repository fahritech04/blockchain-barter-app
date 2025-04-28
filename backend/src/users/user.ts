export class User {
  id: string;
  name: string;
  wallet: number;

  constructor(id: string, name: string, wallet: number = 0) {
    this.id = id;
    this.name = name;
    this.wallet = wallet;
  }

  createUser(id: string, name: string): User {
    return new User(id, name);
  }

  addFunds(amount: number): void {
    this.wallet += amount;
  }

  deductFunds(amount: number): boolean {
    if (this.wallet >= amount) {
      this.wallet -= amount;
      return true;
    }
    return false;
  }

  getWalletBalance(): number {
    return this.wallet;
  }
}
