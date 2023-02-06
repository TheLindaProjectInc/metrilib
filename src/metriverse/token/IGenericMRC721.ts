import { IERC721Enumerable, Transaction } from '../../mrx';

/**
 * Interface that represents a smart contract, which implements MRC721 and is burnable
 *
 * @interface
 */
export interface IGenericMRC721 extends IERC721Enumerable {
  /**
   * Checks if a given address is a controller
   * @param operator
   * @returns {Promise<boolean>} if the operator is a controller
   */
  controllers(operator: string): Promise<boolean>;

  /**
   * Mint a new MRC721 token
   * @param receiver the EVM style address of the receiver
   * @param tokenId the uin256 id for the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  mintUnique(receiver: string, tokenId: bigint): Promise<Transaction>;

  /**
   * Batch mint new MRC721 tokens
   * @param receiver the EVM style address of the receiver
   * @param tokenId the uin256 id for the token
   * @param batchSize the uint8 size of the batch
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  mintUniqueBatch(
    receiver: string,
    tokenId: bigint,
    batchSize: bigint,
    gasLimit?: number
  ): Promise<Transaction>;

  /**
   * Get the contract owner
   * @returns {Promise<string>} the EVM style address of the owner of this contract
   */
  owner(): Promise<string>;

  /**
   * Renounce ownership of this contract
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  renounceOwnership(): Promise<Transaction>;

  /**
   * Set the baseURI for the tokens
   * @param uri the new baseURI for the tokens
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  setBaseURI(uri: string): Promise<Transaction>;

  /**
   * Allow or disallow a controller of this contract, controllers are able to call the mint function.
   * @param operator
   * @param controller
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  setController(operator: string, controller: boolean): Promise<Transaction>;

  /**
   * Transfer ownership of this contract
   * @param address the EVM adddress of the receiver
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  transferOwnership(address: string): Promise<Transaction>;
}
