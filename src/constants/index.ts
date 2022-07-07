import Deployment from '../interfaces/Deployment';
import { contracts as MainNet } from '../network/MainNet';
import { contracts as TestNet } from '../network/TestNet';

export const CONTRACTS: { MainNet: Deployment; TestNet: Deployment } = {
  MainNet,
  TestNet
};
