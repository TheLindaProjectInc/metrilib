import { EVMLog } from './EVMLog';

export interface APILog extends EVMLog {
  transactionId: string;
  outputIndex: number;
  blockHash: string;
  blockHeight: number;
  timestamp: number;
  sender: string;
  contractAddress: string;
  contractAddressHex: string;
  addressHex: string;
}
