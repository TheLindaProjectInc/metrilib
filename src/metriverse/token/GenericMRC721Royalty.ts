import { ZeroAddress } from 'ethers';
import ABI from '../../abi';
import { Transaction } from '../../mrx';

import Provider from '../../provider/Provider';
import GenericMRC721 from './GenericMRC721';
import { IGenericMRC721Royalty } from './IGenericMRC721Royalty';

export default class GenericMRC721Royalty
  extends GenericMRC721
  implements IGenericMRC721Royalty
{
  constructor(address: string, provider: Provider) {
    super(address, provider);
    this.abi = ABI.GenericMRC721Royalty;
  }

  async royaltyInfo(): Promise<
    readonly [beneficiary: string, royalty: bigint]
  > {
    const result = await this.call('royaltyInfo()', []);
    if (result && result.length >= 2) {
      const tup: readonly [beneficiary: string, royalty: bigint] = [
        result[0].toString(),
        BigInt(result[1].toString())
      ];
      return tup;
    }
    return [ZeroAddress, BigInt(0)] as readonly [
      beneficiary: string,
      royalty: bigint
    ];
  }

  async setRoyalty(beneficiary: string, royalty: bigint): Promise<Transaction> {
    const tx = await this.send('setRoyalty(address,uint96)', [
      beneficiary,
      `0x${royalty.toString(16)}`
    ]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
