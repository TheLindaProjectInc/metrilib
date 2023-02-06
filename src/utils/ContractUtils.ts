import { ethers } from 'ethers';
import { CONTRACTS } from '../constants';
import { MetriverseCore } from '../metriverse';
import { Provider } from '../provider';
import { NetworkType } from '../types/NetworkType';
import { Version } from '../types/Version';

const getMetriverseCore = (
  network: NetworkType,
  version: Version | undefined = 'latest',
  provider: Provider
) => {
  if (
    CONTRACTS[version][network].MetriverseCore ===
    ethers.ZeroAddress.replace('0x', '')
  ) {
    throw new Error(`No deployment found for v${version} on the ${network}`);
  }
  return new MetriverseCore(
    CONTRACTS[version][network].MetriverseCore,
    provider
  );
};

const getMetriverseCoreAddress = (
  network: NetworkType,
  version: Version | undefined = 'latest'
) => {
  if (
    CONTRACTS[version][network].MetriverseCore ===
    ethers.ZeroAddress.replace('0x', '')
  ) {
    throw new Error(`No deployment found for v${version} on the ${network}`);
  }
  return CONTRACTS[version][network].MetriverseCore;
};

export { getMetriverseCoreAddress, getMetriverseCore };
