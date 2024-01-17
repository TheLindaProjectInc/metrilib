import TransactionReceipt from './TransactionReceipt';

export interface Transaction {
  txid: string;
  getReceipts: Promise<TransactionReceipt[]>;
  error?: { message: string; code?: string | number };
}
