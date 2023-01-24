import { IERC721Enumerable, Transaction } from '../../mrx';

/**
 * Interface that represents a smart contract, which implements MRC721 and is burnable
 *
 * @interface
 */
export interface IGenericMRC721 extends IERC721Enumerable {
  controllers(operator: string): Promise<boolean>;

  mintUnique(receiver: string, tokenId: bigint): Promise<Transaction>;

  mintUniqueBatch(
    receiver: string,
    tokenId: bigint,
    batchSize: bigint
  ): Promise<Transaction>;

  owner(): Promise<string>;

  renounceOwnership(): Promise<Transaction>;

  setBaseURI(uri: string): Promise<Transaction>;

  setController(operator: string, controller: boolean): Promise<Transaction>;

  transferOwnership(address: string): Promise<Transaction>;
}
