import { equal } from 'assert';
import { APIEventLogs } from '../mrx/interface/APIEventLogs';
import { APIProvider } from '../provider';

const mns = 'c7dfd21c0db742ea6351e5da8989df633a75fa55';

const provider = new APIProvider('MainNet');

describe('APIProvider tests', () => {
  it('should get logs', async () => {
    const eventLogs: APIEventLogs = await provider.getEventLogs(mns);
    equal(eventLogs.logs.length > 0, true);
  }).timeout(60000);
});
