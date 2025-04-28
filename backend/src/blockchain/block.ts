export class Block {
  index: number;
  previousHash: string;
  timestamp: number;
  data: any;
  hash: string;

  constructor(index: number, previousHash: string, timestamp: number, data: any) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    const dataAsString = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data);
    let hash = 0,
      i,
      chr;
    for (i = 0; i < dataAsString.length; i++) {
      chr = dataAsString.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash.toString();
  }
}
