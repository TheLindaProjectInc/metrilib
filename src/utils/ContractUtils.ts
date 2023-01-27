import { ethers } from 'ethers';
import { CONTRACTS } from '../constants';
import { NetworkType } from '../types/NetworkType';
import { Version } from '../types/Version';

const getMetriverseCore = (
  network: NetworkType,
  version: Version | undefined = 'latest'
) => {
  if (
    CONTRACTS[version][network].MetriverseCore ===
    ethers.constants.AddressZero.replace('0x', '')
  ) {
    throw new Error(`No deployment found for v${version} on the ${network}`);
  }
  return CONTRACTS[version][network].MetriverseCore;
};

export { getMetriverseCore };
