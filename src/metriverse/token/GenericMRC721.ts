import { ethers } from 'ethers';
import ABI from '../../abi';
import { Transaction } from '../../mrx/Transaction';
import Provider from '../../provider/Provider';
import MRC721 from './MRC/MRC721';
import { IGenericMRC721 } from './IGenericMRC721';

export default class GenericMRC721 extends MRC721 implements IGenericMRC721 {
  constructor(address: string, provider: Provider) {
    super(address, provider);
    this.abi = ABI.GenericMRC721;
  }

  async controllers(operator: string): Promise<boolean> {
    const isController = await this.call(`controllers(address)`, [operator]);
    return isController ? isController.toString() === 'true' : false;
  }

  async mintUnique(receiver: string, tokenId: bigint): Promise<Transaction> {
    const tx = await this.send('mintUnique(address,uint256)', [
      receiver,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async mintUniqueBatch(
    receiver: string,
    tokenId: bigint,
    batchSize: bigint
  ): Promise<Transaction> {
    const tx = await this.send('mintUnique(address,uint256,uint16)', [
      receiver,
      `0x${tokenId.toString(16)}`,
      `0x${batchSize.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

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

  async setBaseURI(uri: string): Promise<Transaction> {
    const tx = await this.send('setBaseURI(string)', [uri]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async setController(
    operator: string,
    controller: boolean
  ): Promise<Transaction> {
    const tx = await this.send('setController(address,bool)', [
      operator,
      `${controller}`
    ]);
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
}
