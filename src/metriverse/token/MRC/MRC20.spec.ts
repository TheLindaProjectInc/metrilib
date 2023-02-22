import { doesNotReject, equal } from 'assert';
import { MRC20 } from '../../';
import { APIProvider } from '../../../provider';

describe('MRC20 tests', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);

  const tokenAddress = 'fb26a19c8c75cc4a7dfc95260cd838bf204cf1af'; // Embers mainnet address

  const token = new MRC20(tokenAddress, provider);

  it('should match "Embers" for the name', async () => {
    const name = await token.name();
    equal(name, 'Embers');
  }).timeout(20000);

  it('should match "MBRS" for the symbol', async () => {
    const symbol = await token.symbol();
    equal(symbol, 'MBRS');
  }).timeout(20000);

  it('should be 0 decimals', async () => {
    const decimals = await token.decimals();
    equal(decimals, 0);
  }).timeout(20000);

  it('should get a supply', async () => {
    const totalSupply = token.totalSupply();
    doesNotReject(totalSupply);
  }).timeout(20000);
});
