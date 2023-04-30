import { ZeroAddress } from 'ethers';
import ABI from '../../abi';
import { Transaction } from '../../mrx';

import Provider from '../../provider/Provider';
import GenericMRC721Burnable from './GenericMRC721Burnable';
import { IGenericMRC721Royalty } from './IGenericMRC721Royalty';

export default class GenericMRC721BurnableRoyalty
  extends GenericMRC721Burnable
  implements IGenericMRC721Royalty
{
  constructor(address: string, provider: Provider) {
    super(address, provider);
    this.abi = ABI.MetriVerse.GenericMRC721BurnableRoyalty;
  }

  async royaltyInfo(): Promise<[beneficiary: string, royalty: bigint]> {
    const result = await this.call('royaltyInfo()', []);
    if (result && result.length >= 2) {
      const tup: [beneficiary: string, royalty: bigint] = [
        result[0].toString(),
        BigInt(result[1].toString())
      ];
      return tup;
    }
    return [ZeroAddress, BigInt(0)];
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
