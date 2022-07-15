import { equal } from 'assert';
import { APIProvider } from '../provider';
import MetrixContract from './MetrixContract';

describe('MetrixContract tests', () => {
  const network = 'TestNet';
  const provider = new APIProvider(network);

  const address = '19e45f28952d11447cf65b046edb414d0fcd0e32'; //PyroPets TestNet

  const contract = new MetrixContract(address, provider, []);

  it('should get a bigint balance 0 in satoshi', async () => {
    const balance = await contract.balance();
    equal(balance, BigInt(0));
  }).timeout(10000);
});
