import { Transaction } from '../../mrx';
import { IGenericMRC721 } from './IGenericMRC721';

/**
 * Interface that represents a smart contract, which implements MRC721 and has a royalty up to 10%
 *
 * @interface
 */
export interface IGenericMRC721Royalty extends IGenericMRC721 {
  royaltyInfo(): Promise<[beneficiary: string, royalty: bigint]>;
  setRoyalty(beneficiary: string, royalty: bigint): Promise<Transaction>;
}
