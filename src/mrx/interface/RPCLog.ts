import { CreatedContract } from './CreatedContract';
import { EVMLog } from './EVMLog';

export interface RPCLog {
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  outputIndex: number;
  from: string;
  to: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  contractAddress: string;
  excepted: string;
  exceptedMessage: string;
  stateRoot: string;
  utxoRoot: string;
  createdContracts: CreatedContract[];
  destructedContracts: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  log: EVMLog[];
}
