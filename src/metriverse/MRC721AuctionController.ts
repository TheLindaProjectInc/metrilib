import { ethers } from 'ethers';
import ABI from '../abi';
import MetrixContract from '../mrx/MetrixContract';
import { Transaction } from '../mrx/Transaction';
import Provider from '../provider/Provider';

export default class MRC721AuctionController extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MRC721AuctionController);
  }
  /**
   * Get the contract owner
   * @returns {Promise<string>} the EVM style address of the owner of this contract
   */
  async owner(): Promise<string> {
    const o = await this.call(`owner()`, []);
    return o ? o.toString() : ethers.constants.AddressZero;
  }

  async renounceOwnership(): Promise<Transaction> {
    const tx = await this.send('renounceOwnership()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async transferOwnership(address: string): Promise<Transaction> {
    const tx = await this.send('transferOwnership(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async sale(): Promise<string> {
    const s = await this.call(`sale()`, []);
    return s ? s.toString() : ethers.constants.AddressZero;
  }

  async auction(): Promise<string> {
    const s = await this.call(`auction()`, []);
    return s ? s.toString() : ethers.constants.AddressZero;
  }
}
