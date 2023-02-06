import Deployment from '../interfaces/Deployment';
import { contracts as MainNetv1 } from '../network/MainNet/0.0.1';
import { contracts as MainNetv2 } from '../network/MainNet/0.0.2';
import { contracts as MainNetv3 } from '../network/MainNet/0.0.3';
import { contracts as MainNetv4 } from '../network/MainNet/0.0.4';
import { contracts as TestNetv1 } from '../network/TestNet/0.0.1';
import { contracts as TestNetv2 } from '../network/TestNet/0.0.2';
import { contracts as TestNetv3 } from '../network/TestNet/0.0.3';
import { contracts as TestNetv4 } from '../network/TestNet/0.0.4';

export const CONTRACTS = {
  '0.0.1': {
    MainNet: MainNetv1 as Deployment,
    TestNet: TestNetv1 as Deployment
  },
  '0.0.2': {
    MainNet: MainNetv2 as Deployment,
    TestNet: TestNetv2 as Deployment
  },
  '0.0.3': {
    MainNet: MainNetv3 as Deployment,
    TestNet: TestNetv3 as Deployment
  },
  '0.0.4': {
    MainNet: MainNetv4 as Deployment,
    TestNet: TestNetv4 as Deployment
  },
  latest: {
    MainNet: MainNetv4 as Deployment,
    TestNet: TestNetv4 as Deployment
  }
};
