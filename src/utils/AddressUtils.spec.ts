import { equal } from 'assert';
import {
  EthereumAddressRegex,
  fromHexAddress,
  HexAddressRegex,
  MetrixAddressRegex,
  toHexAddress
} from './AddressUtils';

const eth = '0x1006aB418AF315023717B240B84E7Cb31d3e6D98';
const hex = '1006ab418af315023717b240b84e7cb31d3e6d98';
const bs58 = 'M9Mu2sGhrxzvE56RaUUvLh3hPFBQyUrqin';
const network = 'MainNet';
describe('AddressUtils tests', () => {
  it('should get a base58 address from hex address', async () => {
    const b58 = fromHexAddress(network, hex);
    equal(bs58, b58);
  }).timeout(60000);

  it('should get a hex address from base58 address', async () => {
    const h = toHexAddress(bs58);
    equal(hex, h);
  }).timeout(60000);

  it('should match EthereumAddressRegex', async () => {
    const match = eth.match(EthereumAddressRegex);
    equal(match ? match[0] : null, eth);
  }).timeout(60000);

  it('should match HexAddressRegex', async () => {
    const match = hex.match(HexAddressRegex);
    equal(match ? match[0] : null, hex);
  }).timeout(60000);

  it('should match MetrixAddressRegex', async () => {
    const match = bs58.match(MetrixAddressRegex);
    equal(match ? match[0] : null, bs58);
  }).timeout(60000);
});
