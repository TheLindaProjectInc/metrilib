import { CONTRACTS } from '../constants';
import { NetworkType } from '../types/NetworkType';

const getMetriVerseCore = (network: NetworkType) => {
  return CONTRACTS[network].MetriVerseCore;
};

export { getMetriVerseCore };
