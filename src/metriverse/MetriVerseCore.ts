import { ZeroAddress, ZeroHash } from 'ethers';
import ABI from '../abi';
import MetrixContract from '../mrx/MetrixContract';
import { Transaction } from '../mrx/Transaction';
import Provider from '../provider/Provider';

export default class MetriverseCore extends MetrixContract {
  constructor(address: string, provider: Provider) {
    super(address, provider, ABI.MetriVerse.MetriverseCore);
  }

  /**
   * Approve a token for trade on the inbuilt auctions
   * @param assetAddress the token address
   * @param approved whether to approve
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async approveToken(
    assetAddress: string,
    approved: boolean
  ): Promise<Transaction> {
    const tx = await this.send('approveToken(address,bool)', [
      assetAddress,
      approved
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Check if a token is an approved token
   * @param tokenAddress the EVM address to check
   * @returns {Promise<boolean>}  is token approve
   */
  async approvedToken(tokenAddress: string): Promise<boolean> {
    const isApproved = await this.call(`approvedToken(address)`, [
      tokenAddress
    ]);
    return isApproved ? isApproved.toString() === 'true' : false;
  }

  /**
   * Get the current auction controller
   * @returns {Promise<string>} the MRC721AuctionController address
   */
  async auctionController(): Promise<string> {
    const ac = await this.call(`auctionController()`, []);
    return ac ? ac.toString() : ZeroAddress;
  }

  /**
   * Get the current auction fee this number is divided by 10000 to get the percent.
   * @returns {Promise<bigint>} the current auction fee pecent
   */
  async auctionFee(): Promise<bigint> {
    const fee = await this.call(`auctionFee()`, []);
    return fee ? BigInt(fee.toString()) : BigInt(0);
  }

  /**
   * Get the BurnableMRC721 factory address
   * @returns {Promise<string>} the address of the MRC721Factory
   */
  async burnableFactory(): Promise<string> {
    const bf = await this.call(`burnableFactory()`, []);
    return bf ? bf.toString() : ZeroAddress;
  }

  /**
   * Checks if a given address is a controller
   * @param operator
   * @returns {Promise<boolean>} if the operator is a controller
   */
  async controllers(operator: string): Promise<boolean> {
    const isController = await this.call(`controllers(address)`, [operator]);
    return isController ? isController.toString() === 'true' : false;
  }

  /**
   * Create an MRC721 token
   * @param name the name of the token
   * @param symbol the symbol of the token
   * @param baseURI the baseURI of the token
   * @param burnable if the token is burnable
   * @param royalty the royalty of the token
   * @param beneficiary the inital royalty beneficiary
   * @param signature the signed message see {@link permissionSlip}
   * @param gasLimit this 2500000 and 3500000
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async createMRC721(
    name: string,
    symbol: string,
    baseURI: string,
    burnable: boolean,
    royalty: bigint,
    beneficiary: string,
    signature: string,
    gasLimit: number | undefined = 2500000
  ): Promise<Transaction> {
    const tx = await this.send(
      'createMRC721(string,string,string,bool,uint96,address,bytes)',
      [
        name,
        symbol,
        baseURI,
        burnable,
        `0x${royalty.toString(16)}`,
        beneficiary,
        signature
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
   * Get the MRC721 factory address
   * @returns {Promise<string>} the address of the MRC721Factory
   */
  async factory(): Promise<string> {
    const f = await this.call(`factory()`, []);
    return f ? f.toString() : ZeroAddress;
  }

  /**
   * Get the royalty for an auction or sale at a given price
   * @param price the price that the token sold at
   * @returns {Promise<bigint>} the royalty that should be charged
   */
  async getAuctionRoyalty(price: bigint): Promise<bigint> {
    const royalty = await this.call(`getAuctionRoyalty(uint256)`, [
      `${price.toString(16)}`
    ]);
    return royalty ? BigInt(royalty.toString()) : BigInt(0);
  }

  /**
   * Checks if a given address is a controller
   * @param operator
   * @returns {Promise<boolean>} if the operator is a controller
   */
  async getControllers(operator: string): Promise<boolean> {
    const isController = await this.call(`getControllers(address)`, [operator]);
    return isController ? isController.toString() === 'true' : false;
  }

  /**
   * Check if a token is an internal token
   * @param tokenAddress the EVM address to check
   * @returns {Promise<boolean>}  is token internal
   */
  async internalToken(tokenAddress: string): Promise<boolean> {
    const isInternal = await this.call(`internalToken(address)`, [
      tokenAddress
    ]);
    return isInternal ? isInternal.toString() === 'true' : false;
  }

  /**
   * Get the count of internal tokens
   * @returns {Promise<bigint>} the current internal token count
   */
  async internalTokenCount(): Promise<bigint> {
    const count = await this.call(`internalTokenCount()`, []);
    return count ? BigInt(count.toString()) : BigInt(0);
  }

  /**
   * Get the address of an internal token by it's index
   * @param index the uint256 index of the token
   * @returns {Promise<string>} the address of the token or address 0 if it is not set
   */
  async internalTokenIndex(index: bigint): Promise<string> {
    const token = await this.call(`internalTokenIndex(uint256)`, [
      `0x${index.toString(16)}`
    ]);
    return token ? token.toString() : ZeroAddress;
  }

  /**
   * Check if a token is an approved token
   * @param tokenAddress the EVM address to check
   * @returns {Promise<boolean>}  is token approve
   */
  async isApprovedToken(tokenAddress: string): Promise<boolean> {
    const isApproved = await this.call(`isApprovedToken(address)`, [
      tokenAddress
    ]);
    return isApproved ? isApproved.toString() === 'true' : false;
  }

  /**
   * Check if a token is an internal token
   * @param tokenAddress the EVM address to check
   * @returns {Promise<boolean>}  is token internal
   */
  async isInternalToken(tokenAddress: string): Promise<boolean> {
    const isInternal = await this.call(`internalToken(address)`, [
      tokenAddress
    ]);
    return isInternal ? isInternal.toString() === 'true' : false;
  }

  /**
   * Migrate the factories and auction controller(s) to a new contract.
   * @param core the new MetriverseCore contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async migrate(core: string): Promise<Transaction> {
    const tx = await this.send('migrate(address)', [core]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Get the nonce of the given address
   * @param sender the address to get the nonce of
   * @returns {Promise<string>} the nonce of the address
   */
  async nonce(sender: string): Promise<bigint> {
    const n = await this.call(`nonce(address)`, [sender]);
    return n ? BigInt(n.toString()) : BigInt(0);
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
   * Hash parameters which can be signed by a MetriverseController to allow an account
   * to create an MRC721 from one of the factories
   * @param info a keccak256 hash of the token info see {@link tokenInfo}
   * @param royalty a uint96 royalty rate
   * @param burnable if the token will be burnable
   * @param nonce the nonce of the token creator
   * @param beneficiary the beneficiary of the token royalties
   * @returns {Promise<string>} a keccak256 hash of the parameters
   */
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
        burnable,
        `0x${nonce.toString(16)}`,
        beneficiary
      ]
    );
    return unsignedPermission ? unsignedPermission.toString() : ZeroHash;
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
   * Send MRX funds from the contract's balance
   * @param assetAddress the EVM address  to send to
   * @param amount the satoshi amount to send
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async sendFunds(address: string, amount: bigint): Promise<Transaction> {
    const tx = await this.send('sendFunds(address,uint256)', [
      address,
      `0x${amount.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Set the MRC721 auction controller
   * @param address the MRC721AuctuionController
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setAuctionController(address: string): Promise<Transaction> {
    const tx = await this.send('setAuctionController(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Set platform fee for inbuilt auctions
   * @param fee the uint96 fee (up to 1000 or 10%)
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
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

  /**
   * Set the BurnableMRC721 factory address
   * @param address the address of the BurnableMRC721Factory contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setBurnableFactory(address: string): Promise<Transaction> {
    const tx = await this.send('setBurnableFactory(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Allow or disallow a controller of this contract, controllers are able to call the sign for the createMRC721 function.
   * @param operator
   * @param controller
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setController(
    operator: string,
    controller: boolean
  ): Promise<Transaction> {
    const tx = await this.send('setController(address,bool)', [
      operator,
      controller
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   * Set the MRC721 factory address
   * @param address the address of the MRC721Factory contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  async setFactory(address: string): Promise<Transaction> {
    const tx = await this.send('setFactory(address)', [address]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }

  /**
   *
   * @param name the name of the token
   * @param symbol the symbol of the token
   * @param baseURI the base uri of the token
   * @returns {Promise<string>} a keccak256 hash of the data
   */
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
}
