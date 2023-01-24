import { ethers } from 'ethers';
import ABI from '../abi';
import MetrixContract from '../mrx/MetrixContract';
import { Transaction } from '../mrx/Transaction';
import Provider from '../provider/Provider';

export default class MetriverseCore extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MetriverseCore);
  }

  async approveToken(
    assetAddress: string,
    approved: boolean
  ): Promise<Transaction> {
    const tx = await this.send('approveToken(address,bool)', [
      assetAddress,
      `${approved}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async approvedToken(tokenAddress: string): Promise<boolean> {
    const isApproved = await this.call(`approvedToken(address)`, [
      tokenAddress
    ]);
    return isApproved ? isApproved.toString() === 'true' : false;
  }

  async auctionController(): Promise<string> {
    const ac = await this.call(`auctionController()`, []);
    return ac ? ac.toString() : ethers.constants.AddressZero;
  }

  async auctionFee(): Promise<bigint> {
    const ac = await this.call(`auctionController()`, []);
    return ac ? BigInt(ac.toString()) : BigInt(0);
  }

  async burnableFactory(): Promise<string> {
    const bf = await this.call(`burnableFactory()`, []);
    return bf ? bf.toString() : ethers.constants.AddressZero;
  }

  async controllers(operator: string): Promise<boolean> {
    const isController = await this.call(`controllers(address)`, [operator]);
    return isController ? isController.toString() === 'true' : false;
  }
  async createMRC721(
    name: string,
    symbol: string,
    baseURI: string,
    burnable: boolean,
    royalty: bigint,
    beneficiary: string,
    signature: string
  ): Promise<Transaction> {
    const tx = await this.send(
      'createMRC721(string,string,string,bool,uint96,address,bytes)',
      [
        name,
        symbol,
        baseURI,
        `${burnable}`,
        `0x${royalty.toString(16)}`,
        beneficiary,
        signature
      ]
    );
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async factory(): Promise<string> {
    const f = await this.call(`factory()`, []);
    return f ? f.toString() : ethers.constants.AddressZero;
  }

  async getAuctionRoyalty(price: bigint): Promise<bigint> {
    const royalty = await this.call(`getAuctionRoyalty(uint256)`, [
      `${price.toString(16)}`
    ]);
    return royalty ? BigInt(royalty.toString()) : BigInt(0);
  }

  async getControllers(operator: string): Promise<boolean> {
    const isController = await this.call(`getControllers(address)`, [operator]);
    return isController ? isController.toString() === 'true' : false;
  }

  async internalToken(tokenAddress: string): Promise<boolean> {
    const isInternal = await this.call(`internalToken(address)`, [
      tokenAddress
    ]);
    return isInternal ? isInternal.toString() === 'true' : false;
  }

  async internalTokenCount(): Promise<bigint> {
    const count = await this.call(`internalTokenCount()`, []);
    return count ? BigInt(count.toString()) : BigInt(0);
  }

  async internalTokenIndex(index: bigint): Promise<string> {
    const token = await this.call(`internalTokenIndex(uint256)`, [
      `0x${index.toString(16)}`
    ]);
    return token ? token.toString() : ethers.constants.AddressZero;
  }

  async isApprovedToken(tokenAddress: string): Promise<boolean> {
    const isApproved = await this.call(`isApprovedToken(address)`, [
      tokenAddress
    ]);
    return isApproved ? isApproved.toString() === 'true' : false;
  }

  async isInternalToken(tokenAddress: string): Promise<boolean> {
    const isInternal = await this.call(`internalToken(address)`, [
      tokenAddress
    ]);
    return isInternal ? isInternal.toString() === 'true' : false;
  }

  async migrate(core: string): Promise<Transaction> {
    const tx = await this.send('migrate(address)', [core]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async nonce(sender: string): Promise<bigint> {
    const n = await this.call(`nonce(address)`, [sender]);
    return n ? BigInt(n.toString()) : BigInt(0);
  }

  async owner(): Promise<string> {
    const o = await this.call(`owner()`, []);
    return o ? o.toString() : ethers.constants.AddressZero;
  }

  async permissionSlip(
    info: string,
    royalty: bigint,
    burnable: boolean,
    nonce: bigint,
    beneficiary: string
  ): Promise<string> {
    const unsignedPermission = await this.call(
      `permissionSlip(bytes32,uint96,bool,uint256,address)`,
      [
        info,
        `0x${royalty.toString(16)}`,
        `${burnable}`,
        `0x${nonce.toString(16)}`,
        beneficiary
      ]
    );
    return unsignedPermission
      ? unsignedPermission.toString()
      : ethers.constants.HashZero;
  }

  async renounceOwnership(): Promise<Transaction> {
    const tx = await this.send('renounceOwnership()', []);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async sendFunds(assetAddress: string, amount: bigint): Promise<Transaction> {
    const tx = await this.send('sendFunds(address,uint256)', [
      assetAddress,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async setAuctionController(address: string): Promise<Transaction> {
    const tx = await this.send('setAuctionController(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async setAuctionFee(fee: bigint): Promise<Transaction> {
    const tx = await this.send('setAuctionFee(uint96)', [
      `0x${fee.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async setBurnableFactory(address: string): Promise<Transaction> {
    const tx = await this.send('setBurnableFactory(address)', [address]);
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

  async setFactory(address: string): Promise<Transaction> {
    const tx = await this.send('setFactory(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  async tokenInfo(
    name: string,
    symbol: string,
    baseURI: string
  ): Promise<string> {
    const info = await this.call(`tokenInfo(string,string,string)`, [
      name,
      symbol,
      baseURI
    ]);
    return info ? info.toString() : '';
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
