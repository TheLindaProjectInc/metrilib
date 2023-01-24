import { MRC20 } from './MRC20';
import { MRC721 } from './MRC721';
import { MetriverseCore } from './MetriverseCore';
import { GenericMRC721 } from './GenericMRC721';
import { GenericMRC721Burnable } from './GenericMRC721Burnable';
import { GenericMRC721BurnableRoyalty } from './GenericMRC721BurnableRoyalty';
import { GenericMRC721Royalty } from './GenericMRC721Royalty';
import { BaseSale } from './BaseSale';
import { MRC721AuctionController } from './MRC721AuctionController';
import { SimpleAuction } from './SimpleAuction';

const ABI = {
  BaseSale,
  GenericMRC721,
  GenericMRC721Burnable,
  GenericMRC721BurnableRoyalty,
  GenericMRC721Royalty,
  MetriverseCore,
  MRC20,
  MRC721,
  MRC721AuctionController,
  SimpleAuction
};

export default ABI;
