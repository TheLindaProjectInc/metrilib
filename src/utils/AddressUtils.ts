import bs58 from 'bs58';
import { getBytes, sha256 } from 'ethers';
import { networkPrefix } from '../interfaces/NetworkInterface';

export const MetrixAddressRegex = /^([mM])[a-zA-HJ-NP-Z0-9]{25,39}$/;
export const HexAddressRegex = /^[a-fA-F0-9]{40}$/;
export const EthereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const toHexAddress = (address: string) => {
  const bytes = bs58.decode(address);
  const hex = Buffer.from(bytes.buffer).toString('hex');
  return hex.substring(2, hex.length - 8);
};

const fromHexAddress = (
  network: 'MainNet' | 'TestNet' | 'RegTest',
  hex: string
) => {
  if (hex.length !== 40) {
    return undefined;
  }
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  const hash = getBytes(
    sha256(
      sha256(
        `0x${Buffer.from([networkPrefix[network], ...bytes]).toString('hex')}`
      )
    )
  );
  const checksum = [hash[0], hash[1], hash[2], hash[3]];
  return bs58.encode([networkPrefix[network], ...bytes, ...checksum]);
};

export { toHexAddress, fromHexAddress };
