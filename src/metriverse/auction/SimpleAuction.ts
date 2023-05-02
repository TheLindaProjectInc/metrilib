import { ZeroAddress } from 'ethers';
import ABI from '../../abi';
import { MetrixContract, Transaction } from '../../mrx';

import Provider from '../../provider/Provider';

export default class SimpleAuction extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MetriVerse.SimpleAuction);
  }
  /**
   * End an auction once it has expired. During this step the beneficiary is paid
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async auctionEnd(
    assetAddress: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('auctionEnd(address,uint256)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Bid on a MRC721 token that is for auction
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async bid(assetAddress: string, tokenId: bigint): Promise<Transaction> {
    const tx = await this.send('bid(address,uint256)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Cancels an MRC721 auction if has not been bid on yet
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async cancelAuction(
    assetAddress: string,
    tokenId: bigint
  ): Promise<Transaction> {
    const tx = await this.send('cancelAuction(address,uint256)', [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Gets the MetriverseCore contract
   * @returns {Promise<string>} the EVM style address of the MetriverseCore contract
   */
  async core(): Promise<string> {
    const c = await this.call(`core()`, []);
    return c ? c.toString() : ZeroAddress;
  }

  /**
   * Create a new MRC721 auction
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @param minimumBid the minimum bit in satoshi MRX
   * @param biddingTime the bidding time in seconds
   * @param beneficiaryAddress the EVM adddress which the proceeds will go to
   * @param gasLimit optionally the maximum units of gas which can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async createAuction(
    assetAddress: string,
    tokenId: bigint,
    minimumBid: bigint,
    biddingTime: bigint,
    beneficiaryAddress: string,
    gasLimit: number | undefined = 300000
  ): Promise<Transaction> {
    const tx = await this.send(
      'createAuction(address,uint256,uint256,uint256,address)',
      [
        assetAddress,
        `0x${tokenId.toString(16)}`,
        `0x${minimumBid.toString(16)}`,
        `0x${biddingTime.toString(16)}`,
        beneficiaryAddress
      ],
      '0',
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   *  Get a auction object from the contract state
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<[tokenId: bigint, price: bigint, beneficiaryAddress: string]>}  the Sale object
   */
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
      beneficiaryAddress: string,
      ended: boolean
    ]
  > {
    const auction = await this.call(`getAuction(address, uint256)`, [
      assetAddress,
      `0x${tokenId.toString(16)}`
    ]);
    if (auction && auction.length >= 8) {
      const tup: [
        tokenId: bigint,
        winningBid: bigint,
        minimumBid: bigint,
        biddingTime: bigint,
        startTime: bigint,
        winningBidder: string,
        beneficiaryAddress: string,
        ended: boolean
      ] = [
        BigInt(auction[0].toString()),
        BigInt(auction[1].toString()),
        BigInt(auction[2].toString()),
        BigInt(auction[3].toString()),
        BigInt(auction[4].toString()),
        auction[5].toString(),
        auction[6].toString(),
        auction[7].toString() === 'true'
      ];
      return tup;
    }
    return [
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      BigInt(0),
      ZeroAddress,
      ZeroAddress,
      false
    ];
  }

  /**
   * Get the contract owner
   * @returns {Promise<string>} the EVM style address of the owner of this contract
   */
  async owner(): Promise<string> {
    const o = await this.call(`owner()`, []);
    return o ? o.toString() : ZeroAddress;
  }

  /**
   * Pause new sales from being created
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async pause(): Promise<Transaction> {
    const tx = await this.send('pause()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Check if the contract is paused
   * @returns {Promise<boolean>} if the contract is paused
   */
  async paused(): Promise<boolean> {
    const p = await this.call(`paused()`, []);
    return p ? p.toString() === 'true' : false;
  }

  /**
   * Claim the asset from an ended auction
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @param gasLimit optionally the maximum units of gas which can be consumed
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async claim(
    assetAddress: string,
    tokenId: bigint,
    gasLimit: number | undefined = 300000
  ): Promise<Transaction> {
    const tx = await this.send(
      'claim(address,uint256)',
      [assetAddress, `0x${tokenId.toString(16)}`],
      '0',
      gasLimit,
      5000
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Get the balance of MRX in the auction contract if the address has been outbid
   * @returns {Promise<bigint>} the satoshi amount of MRX
   */
  async pendingReturns(address: string): Promise<bigint> {
    const p = await this.call(`pendingReturns(address)`, [address]);
    return p ? BigInt(p.toString()) : BigInt(0);
  }

  /**
   * Renounce ownership of this contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async renounceOwnership(): Promise<Transaction> {
    const tx = await this.send('renounceOwnership()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Transfer ownership of this contract
   * @param address the EVM adddress of the receiver
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async transferOwnership(address: string): Promise<Transaction> {
    const tx = await this.send('transferOwnership(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Unpause allowing new sales to be created
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async unpause(): Promise<Transaction> {
    const tx = await this.send('unpause()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Withdraw any MRX funds from outbid auctions
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async withdraw(): Promise<Transaction> {
    const tx = await this.send('withdraw()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
