import { CONTRACTS } from '../constants';
import { NetworkType } from '../types/NetworkType';

const getMetriverseCore = (network: NetworkType) => {
  return CONTRACTS[network].MetriverseCore;
};

export { getMetriverseCore };
