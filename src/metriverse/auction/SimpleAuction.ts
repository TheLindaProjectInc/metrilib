import { ethers } from 'ethers';
import ABI from '../../abi';
import { MetrixContract, Transaction } from '../../mrx';

import Provider from '../../provider/Provider';

export default class SimpleAuction extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.SimpleAuction);
  }
  async auctionEnd(
    assetAddress: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('auctionEnd(address,tokenId)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async bid(assetAddress: string, tokenId: bigint) {
    const tx = await this.send('bid(address,tokenId)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async cancelAuction(
    assetAddress: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('cancelAuction(address,tokenId)', [
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

  async getAuction(
    assetAddress: string,
    tokenId: bigint
  ): Promise<
    [
      tokenId: bigint,
      winningBid: bigint,
      minimumBid: bigint,
      biddingTime: bigint,
      startTime: bigint,
      winningBidder: string,
      beneficiaryAddress: string
    ]
  > {
    return [
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      ethers.constants.AddressZero,
      ethers.constants.AddressZero
    ];
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

  async pendingReturns(): Promise<bigint> {
    const p = await this.call(`paused()`, []);
    return p ? BigInt(p.toString()) : BigInt(0);
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

  async withdraw(): Promise<Transaction> {
    const tx = await this.send('withdraw()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
