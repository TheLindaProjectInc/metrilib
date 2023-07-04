import { ZeroAddress, Interface, Result, ZeroHash } from 'ethers';
import Provider from './Provider';
import ContractResponse from '../mrx/ContractResponse';
import { TransactionReceipt } from '../mrx';
import { MetrixRPCNode } from '../lib/MetrixRPC/MetrixRPC';
import { NetworkType } from '../types/NetworkType';
import { RPCEventLogs } from '../mrx/interface/RPCEventLogs';

const AddressZero = ZeroAddress.replace('0x', '');

export default class RPCProvider implements Provider {
  network: NetworkType;
  mrpc: MetrixRPCNode;
  sender: string | undefined;
  constructor(network: NetworkType, mrpc: MetrixRPCNode, sender: string) {
    this.network = network;
    this.mrpc = mrpc;
    this.sender = sender;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getTxReceipts(
    tx: { txid: string; sender: string; hash160: string },
    abi: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    contract?: string
  ) {
    if (!abi) {
      return [];
    }
    const receipts: TransactionReceipt[] = [];
    try {
      const { txid, sender, hash160 } = tx; // eslint-disable-line @typescript-eslint/no-unused-vars
      if (txid === ZeroHash.replace('0x', '')) {
        return receipts;
      }
      let transaction = await this.mrpc.promiseGetTransaction(txid);
      let transactionReceipt: TransactionReceipt[] =
        await this.mrpc.promiseGetTransactionReceipt(txid);

      while (
        transactionReceipt.length < 1 ||
        (transaction.confirmations < 1 && transaction.confirmations > -1)
      ) {
        await new Promise((resolve) => setTimeout(resolve, 60000));
        transaction = await this.mrpc.promiseGetTransaction(txid);
        transactionReceipt = await this.mrpc.promiseGetTransactionReceipt(txid);
      }

      if (transaction.confirmations == -1) {
        console.log(`Failed, transaction orphaned`);
        return [];
      }
      const iface = new Interface(abi);

      const eventMap = new Map();
      for (const receipt of transactionReceipt) {
        for (const log of receipt.log ? receipt.log : []) {
          if (log.address === contract) {
            const topics = log.topics.map((topic: string) => {
              return `0x${topic}`;
            });
            const data = `0x${log.data}`;
            const description = iface.parseLog({ data, topics });
            const event = description?.fragment;
            if (description && event) {
              const name = event.name;
              const events = eventMap.get(name) ? eventMap.get(name) : [];
              events.push({ event, description, timestamp: log.timestamp });
              eventMap.set(name, events);
            }
          }
        }
        receipts.push(receipt);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(
        `Failed, ${e.message ? e.message : 'An unknown error occurred'}`
      );
    }
    return receipts;
  }

  async callContract(
    contract: string,
    method: string,
    data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    abi: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<Result | undefined> {
    let result: Result | undefined = undefined;
    if (!abi || !this.sender) {
      return result;
    }
    const iface = new Interface(abi);
    const encoded = iface.encodeFunctionData(method, data).replace('0x', '');
    const response: ContractResponse = (await this.mrpc.promiseCallContract(
      contract,
      encoded,
      this.sender
    )) as ContractResponse;

    if (response) {
      const output = response.executionResult.output;
      result = iface.decodeFunctionResult(method, `0x${output}`);
    }
    return result;
  }

  async sendToContract(
    contract: string,
    method: string,
    data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    value = '0',
    gasLimit = 250000,
    gasPrice = 5000,
    abi: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    changeToSender: boolean | undefined = true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    if (!this.sender) return undefined;
    let result = {
      txid: ZeroHash.replace('0x', ''),
      sender: AddressZero,
      hash160: AddressZero
    };
    if (!abi) {
      return result;
    }
    const iface = new Interface(abi);
    const encoded = method
      ? iface.encodeFunctionData(method, data).replace('0x', '')
      : '';
    const response = await this.mrpc.promiseSendToContract(
      contract,
      encoded,
      value,
      gasLimit,
      gasPrice * 1e-8,
      this.sender,
      true,
      changeToSender === true
    );
    if (response) {
      const receipts = await this.getTxReceipts(response, abi, contract);
      if (receipts.length > 0) {
        result = {
          txid: receipts[0].transactionHash,
          sender: await this.mrpc.promiseFromHexAddress(receipts[0].from),
          hash160: receipts[0].from
        };
      }
    }
    return result;
  }

  async balance(address: string): Promise<bigint> {
    const raw = await this.mrpc.promiseGetAccountInfo(address);
    if (raw && raw.balance) {
      const bal = raw.balance ? BigInt(raw.balance) : BigInt(0);
      return bal;
    }
    return BigInt(0);
  }

  /**
   * Get logs from a contract
   *
   * @param {string} contract transaction object
   * @param {bigint | undefined} startHeight starting block height to get logs defaults to current block height -10000
   * @return {Promise<RPCEventLogs>} an {@link RPCEventLogs} object
   *
   */
  async getEventLogs(
    contract: string,
    startHeight?: bigint
  ): Promise<RPCEventLogs> {
    const height = await this.mrpc.promiseGetBlockCount();
    let start = BigInt(height - 10000);
    if (startHeight) {
      start = startHeight;
    }
    const logs: RPCEventLogs = await this.mrpc.promiseSearchLogs(
      Number(start),
      -1,
      [contract],
      undefined,
      1
    );
    return logs;
  }

  async searchEventLogs(
    contract: string,
    topics?: string[] | undefined,
    fromBlock: number | undefined = 0,
    toBlock: number | undefined = -1
  ): Promise<RPCEventLogs> {
    throw new Error('Method not implemented.');
  }
}
