import { Transaction } from '../../mrx';
import { IGenericMRC721 } from './IGenericMRC721';

/**
 * Interface that represents a smart contract, which implements MRC721 and has a royalty up to 10%
 *
 * @interface
 */
export interface IGenericMRC721Royalty extends IGenericMRC721 {
  /**
   * Get the current royalty info
   * @returns {Promise<[beneficiary: string, royalty: bigint]>} the royalty info object
   */
  royaltyInfo(): Promise<[beneficiary: string, royalty: bigint]>;

  /**
   * Set the current royalty info
   * @param beneficiary the EVM style address of the beneficiary
   * @param royalty the uint96 amount of the royalty 100 = 1%
   */
  setRoyalty(beneficiary: string, royalty: bigint): Promise<Transaction>;
}
