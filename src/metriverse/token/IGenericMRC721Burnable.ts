import { Transaction } from '../../mrx';
import { IGenericMRC721 } from './IGenericMRC721';

/**
 * Interface that represents a smart contract, which implements MRC721 and is burnable
 *
 * @interface
 */
export interface IGenericMRC721Burnable extends IGenericMRC721 {
  /**
   * Burn a token, permanently removing it from the supply
   * @param tokenId the uint256 id of the token
   * @returns {Promise<Transaction>} an array of TransactionReceipt objects
   */
  burn(tokenId: bigint): Promise<Transaction>;
}
