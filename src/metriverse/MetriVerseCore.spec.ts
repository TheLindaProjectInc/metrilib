import { ZeroAddress } from 'ethers';
import { APIProvider } from '../provider';
import { getMetriverseCore } from '../utils/ContractUtils';
import { equal, notEqual } from 'assert';
import MRC721AuctionController from './MRC721AuctionController';
import { MetrixContract } from '../mrx';

describe('MetriVerseCore tests', () => {
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

  it('has a BunableFactory', async () => {
    const factory = await core.burnableFactory();
    notEqual(factory, ZeroAddress);
  }).timeout(20000);

  it('owns the BunableFactory', async () => {
    const factory = await core.burnableFactory();
    const contract = new MetrixContract(
      factory.replace('0x', '').toLowerCase(),
      provider,
      [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address'
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address'
            }
          ],
          name: 'OwnershipTransferred',
          type: 'event'
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address'
            }
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
    );
    const owner = await contract.call(`owner()`, []);
    equal(
      owner
        ? owner.toString().replace('0x', '').toLowerCase()
        : ZeroAddress.replace('0x', '').toLowerCase(),
      core.address
    );
  }).timeout(20000);

  it('has a factory', async () => {
    const factory = await core.factory();
    notEqual(factory, ZeroAddress);
  }).timeout(20000);

  it('owns the factory', async () => {
    const factory = await core.burnableFactory();
    const contract = new MetrixContract(
      factory.replace('0x', '').toLowerCase(),
      provider,
      [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'previousOwner',
              type: 'address'
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address'
            }
          ],
          name: 'OwnershipTransferred',
          type: 'event'
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address'
            }
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
    );
    const owner = await contract.call(`owner()`, []);
    equal(
      owner
        ? owner.toString().replace('0x', '').toLowerCase()
        : ZeroAddress.replace('0x', '').toLowerCase(),
      core.address
    );
  }).timeout(20000);

  it('returns 2% auctionFee', async () => {
    const fee = await core.auctionFee();
    equal(BigInt(200), fee);
  }).timeout(20000);
});
