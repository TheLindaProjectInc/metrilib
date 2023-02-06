import { equal } from 'assert';
import { ethers } from 'ethers';
import { MRC721 } from '../../';
import { APIProvider } from '../../../provider';

describe('MRC721 tests', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const tokenAddress = '848b9ec4299dac31d21c5db87add813d0cfc58c5'; // PyroPets mainnet address

  const token = new MRC721(tokenAddress, provider);

  it('should match "PyroPets" for the name', async () => {
    const name = await token.name();
    equal(name, 'PyroPets');
  }).timeout(10000);

  it('should match "PYRO" for the symbol', async () => {
    const symbol = await token.symbol();
    equal(symbol, 'PYRO');
  }).timeout(10000);

  it('should match "848b9ec4299dac31d21c5db87add813d0cfc58c5" for the owner of token 0', async () => {
    const owner = await token.ownerOf(BigInt(0));
    equal(
      owner.toLowerCase().replace('0x', ''),
      '848b9ec4299dac31d21c5db87add813d0cfc58c5'
    );
  }).timeout(10000);

  it('should match "https://pyropets.org/api/metadata/MainNet/0" for the tokenURI of token 0', async () => {
    const uri = await token.tokenURI(BigInt(0));
    equal(uri, 'https://pyropets.org/api/metadata/MainNet/0');
  }).timeout(10000);

  it('should return address 0x0 (nobody) as approved token 0', async () => {
    const approved = await token.getApproved(BigInt(0));
    equal(approved, ethers.ZeroAddress);
  }).timeout(10000);
});
