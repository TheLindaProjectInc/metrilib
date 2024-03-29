import { Result } from 'ethers';
import Provider from '../provider/Provider';
import { EventLogs } from './type/EventLogs';

export default class MetrixContract {
  address: string;
  provider: Provider;
  abi: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  bytecode: string | undefined;

  constructor(
    address: string,
    provider: Provider,
    abi: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
    bytecode?: string
  ) {
    this.address = address.toLowerCase().replace('0x', '');
    this.provider = provider;
    this.abi = abi;
    this.bytecode = bytecode;
  }

  /**
   * Get this contract balance
   *
   * @return {Promise<bigint>} the satoshi balance of this contract
   *
   * @public
   */
  public async balance(): Promise<bigint> {
    return await this.provider.balance(this.address);
  }

  /**
   * Perform calltocontract
   *
   * @param {string} method The contract method to call
   * @param {string[]|undefined} args The arguments
   *
   * @return {Result} see Result
   *
   * @public
   */ //eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async call(method: string, args: any[]): Promise<Result | undefined> {
    return await this.provider.callContract(
      this.address,
      method,
      args,
      this.abi
    );
  }

  /**
   * Perform sendtocontract
   *
   * @param {string} method The contract method to send to
   * @param {string[] | undefined} args The arguments to use
   * @param {string | undefined} value The amount to send to the contract
   * @param {number | undefined} gasLimit The amount of gas units allowed
   * @param {number | undefined} gasPrice The satoshi price per gas
   *
   * @return {Result} see Result
   *
   * @public
   */
  public async send(
    method: string,
    args: any[], //eslint-disable-line @typescript-eslint/no-explicit-any
    value: string | undefined = '0',
    gasLimit: number | undefined = 250000,
    gasPrice: number | undefined = 5000
  ): Promise<{
    txid: string;
    sender: string;
    hash160: string;
  }> {
    return await this.provider.sendToContract(
      this.address,
      method,
      args,
      value,
      gasLimit,
      gasPrice,
      this.abi
    );
  }

  /**
   * Get receipts from a transaction
   *
   * @return {Promise<EventLogs>} an {@link EventLogs} object
   *
   */
  getEventLogs(): Promise<EventLogs> {
    return this.provider.getEventLogs(this.address);
  }
}
