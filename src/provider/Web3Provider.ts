import { Interface, Result, ZeroAddress, ZeroHash } from 'ethers';
import Provider from './Provider';
import { TransactionReceipt } from '../mrx';
import { NetworkType } from '../types/NetworkType';
import { APIEventLogs } from '../mrx/interface/APIEventLogs';
import { APILog } from '../mrx/interface/APILog';
import { toHexAddress } from '../utils/AddressUtils';

export default class Web3Provider implements Provider {
  network: NetworkType;

  constructor(network: NetworkType) {
    this.network = network;
  }

  private async getTransactionReceipt(
    txid: string
  ): Promise<TransactionReceipt | undefined> {
    let uri;
    switch (this.network) {
      case 'MainNet':
        uri = 'https://explorer.metrixcoin.com/api';
        break;
      case 'TestNet':
        uri = 'https://testnet-explorer.metrixcoin.com/api';
        break;
      default:
        return undefined;
    }
    let receipt: TransactionReceipt | undefined;
    try {
      const response = await fetch(`${uri}/tx/${txid}`);
      if (response.status === 200) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const tx = JSON.parse(JSON.stringify(await response.json()));
          for (const output of tx.outputs || []) {
            if (output.receipt) {
              receipt = {
                confirmations: tx.confirmations,
                blockHash: tx.blockHash,
                blockNumber: tx.blockHeight,
                transactionHash: tx.hash,
                transactionIndex: 0,
                to: output.receipt.contractAddress,
                outputIndex: 1,
                from: toHexAddress(output.receipt.sender),
                cumulativeGasUsed: output.receipt.gasUsed,
                gasUsed: output.receipt.gasUsed,
                contractAddress: output.receipt.contractAddress,
                excepted: output.receipt.excepted,
                exceptedMessage: output.receipt.exceptedMessage,
                logs: output.receipt.logs ? output.receipt.logs : []
              };
              break;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    return receipt;
  }

  // eslint-disable-next-line
  async getTxReceipts(
    tx: { txid: string; sender: string; hash160: string },
    abi: any[], // eslint-disable-line
    contract?: string // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    const receipts: TransactionReceipt[] = [];
    try {
      const { txid, sender, hash160 } = tx; // eslint-disable-line @typescript-eslint/no-unused-vars
      if (txid === ZeroHash.replace('0x', '')) {
        return receipts;
      }
      const checkConfirm = async () => {
        const receipt = await this.getTransactionReceipt(txid);
        return receipt;
      };
      const confirmed = await checkConfirm();
      if (
        confirmed && confirmed.confirmations != undefined
          ? confirmed.confirmations > 0
          : false
      ) {
        receipts.push(confirmed as TransactionReceipt);
      } else {
        let receipt: TransactionReceipt | undefined;
        for (let i = 0; i < 30; i++) {
          receipt = await checkConfirm();
          if (!receipt) {
            await new Promise((resolve) => setTimeout(resolve, 60000));
          } else {
            if (
              receipt.confirmations != undefined
                ? receipt.confirmations > 0
                : false
            ) {
              break;
            } else {
              await new Promise((resolve) => setTimeout(resolve, 60000));
            }
          }
        }
        if (receipt) {
          receipts.push(receipt);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(
        `Failed, ${e.message ? e.message : 'An unknown error occurred'}`
      );
      return receipts;
    }
    return receipts;
  }

  async callContract(
    contract: string,
    method: string,
    data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    abi: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<Result | undefined> {
    switch (this.network) {
      case 'MainNet':
        break;
      case 'TestNet':
        break;
      default:
        return undefined;
    }
    const iface = new Interface(abi);
    const encoded = iface.encodeFunctionData(method, data).replace('0x', '');
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = (window as any).metrimask.rpcProvider.rawCall(
        'callcontract',
        [contract.toLowerCase().replace('0x', ''), encoded.replace('0x', '')]
      );
      const response = (await result).executionResult.output;
      const decoded: Result = iface.decodeFunctionResult(
        method,
        `0x${response}`
      );
      return decoded;
    } catch (e) {
      console.log('error!!!');
      console.log(e);
    }
    return undefined;
  }

  async sendToContract(
    contract: string,
    method: string,
    data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    value = '0',
    gasLimit = 250000,
    gasPrice = 5000,
    abi: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    switch (this.network) {
      case 'MainNet':
        break;
      case 'TestNet':
        break;
      default:
        return undefined;
    }
    try {
      const iface = new Interface(abi);
      const encoded = iface.encodeFunctionData(method, data).replace('0x', '');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (window as any).metrimask.rpcProvider.rawCall(
        'sendtocontract',
        [
          contract.toLowerCase().replace('0x', ''),
          encoded.replace('0x', ''),
          value,
          gasLimit,
          gasPrice
        ]
      );
      return result && result.txid != undefined
        ? {
            txid: result.txid,
            sender: ZeroAddress.replace('0x', ''),
            hash160: ZeroAddress.replace('0x', '')
          }
        : {
            txid: ZeroHash.replace('0x', ''),
            sender: ZeroAddress.replace('0x', ''),
            hash160: ZeroAddress.replace('0x', '')
          };
    } catch (e) {
      throw new Error(
        (e as any).message ? (e as any).message : 'An unknown error occurred'
      );
    }
  }

  async balance(address: string): Promise<bigint> {
    let uri = '';
    switch (this.network) {
      case 'MainNet':
        uri = 'https://explorer.metrixcoin.com/api';
        break;
      case 'TestNet':
        uri = 'https://testnet-explorer.metrixcoin.com/api';
        break;
      default:
        return BigInt(0);
    }
    const raw = await (
      await fetch(
        `${uri}/address/${
          address.startsWith('0x')
            ? address.slice(2).toLowerCase()
            : address.toLowerCase()
        }`
      )
    ).json();
    const bal = raw.balance ? BigInt(raw.balance) : BigInt(0);
    return bal;
  }

  /**
   * Get receipts from a transaction
   *
   * @param {string} contract transaction object
   * @return {Promise<APIEventLogs>} an {@link APIEventLogs} object
   *
   */
  async getEventLogs(contract: string): Promise<APIEventLogs> {
    let uri = '';
    const logs: APILog[] = [];
    switch (this.network) {
      case 'MainNet':
        uri = 'https://explorer.metrixcoin.com/api';
        break;
      case 'TestNet':
        uri = 'https://testnet-explorer.metrixcoin.com/api';
        break;
      default:
        break;
    }
    const raw: APIEventLogs = await (
      await fetch(
        `${uri}/searchlogs?contract=${
          contract.startsWith('0x')
            ? contract.slice(2).toLowerCase()
            : contract.toLowerCase()
        }&limit=100&offset=0`
      )
    ).json();
    for (const r of raw.logs) {
      logs.push(r);
    }
    const totalCount = raw.totalCount ? raw.totalCount : 0;
    if (totalCount > 100) {
      for (let i = 100; i < totalCount; i += 100) {
        const raw = await (
          await fetch(
            `${uri}/searchlogs?contract=${
              contract.startsWith('0x')
                ? contract.slice(2).toLowerCase()
                : contract.toLowerCase()
            }&limit=100&offset=${i * 100}`
          )
        ).json();
        for (const r of raw.logs) {
          logs.push(r);
        }
      }
    }
    return {
      totalCount,
      logs
    };
  }

  async searchEventLogs(
    contract: string,
    topics?: string[] | undefined,
    fromBlock: number | undefined = 0,
    toBlock: number | undefined = -1
  ): Promise<APIEventLogs> {
    throw new Error('Method not implemented.');
  }
}
