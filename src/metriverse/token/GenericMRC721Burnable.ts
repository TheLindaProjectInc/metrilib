import ABI from '../../abi';
import { Transaction } from '../../mrx/Transaction';
import Provider from '../../provider/Provider';
import GenericMRC721 from './GenericMRC721';
import { IGenericMRC721Burnable } from './IGenericMRC721Burnable';

export default class GenericMRC721Burnable
  extends GenericMRC721
  implements IGenericMRC721Burnable
{
  constructor(address: string, provider: Provider) {
    super(address, provider);
    this.abi = ABI.MetriVerse.GenericMRC721Burnable;
  }

  async burn(tokenId: bigint): Promise<Transaction> {
    const tx = await this.send('burn(uint256)', [`0x${tokenId.toString(16)}`]);
    const getReceipts = this.provider.getTxReceipts(tx, this.abi, this.address);
    return {
      txid: tx.txid,
      getReceipts
    };
  }
}
