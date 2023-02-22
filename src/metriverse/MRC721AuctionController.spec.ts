import { equal, notEqual } from 'assert';
import { ZeroAddress } from 'ethers';
import { BaseSale, getMetriverseCore, SimpleAuction } from '../';
import { APIProvider } from '../provider';
import MRC721AuctionController from './MRC721AuctionController';

describe('MRC721AuctionController tests', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const core = getMetriverseCore(network, provider, 'latest');

  it('has a auctionController', async () => {
    const controller = await core.auctionController();
    notEqual(controller, ZeroAddress);
  }).timeout(20000);

  it('owns the auctionController', async () => {
    const controller = await core.auctionController();
    const ac = new MRC721AuctionController(controller, provider);
    const owner = await ac.owner();
    equal(owner.toLowerCase().replace('0x', ''), core.address);
  }).timeout(20000);

  it('has an auction', async () => {
    const controller = await core.auctionController();
    const ac = new MRC721AuctionController(controller, provider);
    const auction = await ac.auction();
    const a = new SimpleAuction(auction, provider);
    const owner = await a.owner();
    notEqual(auction, ZeroAddress);
    equal(owner, controller);
  }).timeout(20000);

  it('has a sale', async () => {
    const controller = await core.auctionController();
    const ac = new MRC721AuctionController(controller, provider);
    const sale = await ac.sale();
    const s = new BaseSale(sale, provider);
    const owner = await s.owner();
    notEqual(sale, ZeroAddress);
    equal(owner, controller);
  }).timeout(20000);
});
