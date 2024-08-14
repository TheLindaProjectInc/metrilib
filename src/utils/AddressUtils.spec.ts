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

  it('should do my list', async () => {
    const list = [
      '97b370c33b8ef5554f927a95a2bf81e51e68061c',
      '08034b45ab02fa3148be3d3b2bbe04c42c0212f8',
      '9edaeac1622b6c55bbce1858e2a4dc0a6cf39c03',
      '3cc5165945bc61544038b7539ec42965defcbba8',
      'ab96a1a4b2b5b2377ca33b379922b3e9aa5b4281',
      '7cb46daa1df0887e089720eda34edc045270e6c5',
      '58da85f19dccd75d3b3b55a416ef2339f5369b69',
      '26832269b62065ab585fd5701166f616c0d610b7',
      '4be594a5abd0fcea0282eaa35f41aeae416aef34',
      '05c5adb75c14e24392b773873386db27ca9ce8a5',
      '2ebd3bf37d90f865cf550cb5c3361a7cef5b6381',
      '6e43f5021f7b29c6bf2464a9198a205409477fe1',
      'a62f776ac9b4de13aabc697c79ea76e2a02d8cf1',
      'a584599d52939a6932414e7947f96006942f7d56',
      '4ab82c070a26accc9c758010581d8f5154c612e2',
      '9c286ea9b124040e7476a58bb34528f09fec139e',
      '3f1dad2b08308298d084639a5dafa4b8a15147b7',
      '9e0e5eb25c9c39df11e3b93cd703ceb646b9c9e3',
      'c22b8e23fdde87f12a50a43bba8aaa7adb9a9262'
    ];
    console.log(list.map((l) => fromHexAddress('MainNet', l)));
    equal(true, list.length > 0);
  }).timeout(60000);
});
