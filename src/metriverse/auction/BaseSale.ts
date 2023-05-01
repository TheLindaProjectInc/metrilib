import { ZeroAddress } from 'ethers';
import ABI from '../../abi';
import { MetrixContract, Transaction } from '../../mrx';

import Provider from '../../provider/Provider';

export default class BaseSale extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MetriVerse.BaseSale);
  }

  /**
   * Cancels an MRC721 sale
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
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

  /**
   * Gets the MetriverseCore contract
   * @returns {Promise<string>} the EVM style address of the MetriverseCore contract
   */
  async core(): Promise<string> {
    const c = await this.call(`core()`, []);
    return c ? c.toString() : ZeroAddress;
  }

  /**
   * Create a new MRC721 sale
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @param price the price in satoshi MRX
   * @param beneficiaryAddress the EVM adddress which the proceeds will go to
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
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

  /**
   *  Get a sale object from the contract state
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<[tokenId: bigint, price: bigint, beneficiaryAddress: string]>}  the Auction object
   */
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
    return [BigInt(0), BigInt(0), ZeroAddress];
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
   * Purchase an MRC721 token which is for sale.
   * @param assetAddress the EVM adddress of the MRC721 contract
   * @param tokenId the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
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
}
