import { ethers } from 'ethers';
import ABI from '../../abi';
import { MetrixContract, Transaction } from '../../mrx';

import Provider from '../../provider/Provider';

export default class BaseSale extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.BaseSale);
  }

  async cancelSale(
    assetAddress: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('cancelSale(address,tokenId)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async core(): Promise<string> {
    const c = await this.call(`core()`, []);
    return c ? c.toString() : ethers.constants.AddressZero;
  }

  async createSale(
    assetAddress: string,
    tokenId: bigint,
    price: bigint,
    beneficiaryAddress: string
  ): Promise<Transaction> {
    const tx = await this.send('createSale(address,uint256,uint256,address)', [
      assetAddress,
      `0x${tokenId.toString(16)}`,
      `0x${price.toString(16)}`,
      beneficiaryAddress
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async getSale(
    assetAddress: string,
    tokenId: bigint
  ): Promise<[tokenId: bigint, price: bigint, beneficiaryAddress: string]> {
    const sale = await this.call(`getSale(address, uint256)`, [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    if (sale && sale.length >= 3) {
      const tup: [tokenId: bigint, price: bigint, beneficiaryAddress: string] =
        [
          BigInt(sale[0].toString()),
          BigInt(sale[1].toString()),
          sale[2].toString()
        ];
      return tup;
    }
    return [BigInt(0), BigInt(0), ethers.constants.AddressZero];
  }

  async owner(): Promise<string> {
    const o = await this.call(`owner()`, []);
    return o ? o.toString() : ethers.constants.AddressZero;
  }

  async pause(): Promise<Transaction> {
    const tx = await this.send('pause()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async paused(): Promise<boolean> {
    const p = await this.call(`paused()`, []);
    return p ? p.toString() === 'true' : false;
  }

  async purchase(assetAddress: string, tokenId: bigint): Promise<Transaction> {
    const tx = await this.send('purchase(address,uint256)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
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

  async unpause(): Promise<Transaction> {
    const tx = await this.send('unpause()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
