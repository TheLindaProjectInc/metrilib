import { equal } from 'assert';
import { APIEventLogs } from '../mrx/interface/APIEventLogs';
import { APIProvider } from '../provider';
import TransactionReceipt from '../mrx/TransactionReceipt';

const mns = 'c7dfd21c0db742ea6351e5da8989df633a75fa55';

const provider = new APIProvider('MainNet');

describe('APIProvider tests', () => {
  it('should get logs', async () => {
    const eventLogs: APIEventLogs = await provider.getEventLogs(mns);
    equal(eventLogs.logs.length > 0, true);
  }).timeout(60000);

  it('should get tx receipts', async () => {
    const receipts: TransactionReceipt[] = await provider.getTxReceipts(
      {
        txid: '028cc918b8072d66df0070400dd1a76836d8889a601f3d4f6d8269eac4934f1e',
        sender: '',
        hash160: ''
      },
      []
    );
    equal(receipts.length > 0, true);
  }).timeout(60000);
});
