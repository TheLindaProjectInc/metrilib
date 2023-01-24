import { Transaction } from '../../mrx';
import { IGenericMRC721 } from './IGenericMRC721';

/**
 * Interface that represents a smart contract, which implements MRC721 and is burnable
 *
 * @interface
 */
export interface IGenericMRC721Burnable extends IGenericMRC721 {
  burn(tokenId: bigint): Promise<Transaction>;
}
