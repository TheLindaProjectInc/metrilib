import { Result } from 'ethers';
import { EventLogs, TransactionReceipt } from '../mrx';
import { NetworkType } from '../types/NetworkType';

export default interface Provider {
  network: NetworkType;

  /**
   * Get receipts from a transaction
   *
   * @param {string} contract transaction object
   * @return {Promise<APIEventLogs | RPCEventLogs>} an {@link EventLogs} object
   *
   */
  getEventLogs(contract: string): Promise<EventLogs>;

  /**
   * Search events from a contract
   *
   * @param {string} contract transaction object
   * @param {string[] | undefined} topics the topics to filter by
   * @param {number | undefined} fromBlock the starting block height to filter by defaults to 0
   * @param {number | undefined} toBlock the end block height to filter by, defaults to -1 for most recent block
   * @return {Promise<APIEventLogs | RPCEventLogs>} an {@link EventLogs} object
   *
   */
  searchEventLogs(
    contract: string,
    topics?: string[],
    fromBlock?: number,
    toBlock?: number
  ): Promise<EventLogs>;

  /**
   * Get receipts from a transaction
   *
   * @param {{ txid: string; sender: string; hash160: string }} tx transaction object
   * @param {any[]} abi The abi for the contract that was called
   * @param {string|undefined} contract the contract address, if there is one
   * @return {Promise<TransactionReceipt[]>} an array of {@link TransactionReceipt} objects
   *
   */
  getTxReceipts(
    tx: { txid: string; sender: string; hash160: string },
    abi: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    contract?: string
  ): Promise<TransactionReceipt[]>;

  /**
   * Perform calltocontract
   *
   * @param {string} contract The contract address
   * @param {string} method The contract method to call
   * @param {any[]} data The arguments
   * @param {any[]} abi The contract abi
   *
   * @return {Promise<Result | undefined>} see Result
   *
   */
  callContract(
    contract: string,
    method: string,
    data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    abi: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<Result | undefined>;

  /**
   * Perform sendtocontract
   *
   * @param {string} contract The contract address
   * @param {string} method The contract method to send to
   * @param {any[]} data The arguments to use
   * @param {string} value The amount to send to the contract
   * @param {number} gasLimit The amount of gas units allowed
   * @param {number} gasPrice The satoshi price per gas
   * @param {any[]} abi The contract abi
   *
   * @return {Promise<Result | undefined>} see Result
   *
   */
  sendToContract(
    contract: string,
    method: string,
    data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    value: string,
    gasLimit: number,
    gasPrice: number,
    abi: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  balance(address: string): Promise<bigint>;
}
