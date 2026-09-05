import { NotImplementedError } from '../errors';
import { StubBackgroundSync } from '../backgroundSync';

describe('StubBackgroundSync', () => {
  const sync = new StubBackgroundSync();

  it('scheduleTask throws NotImplementedError rather than claiming a task was scheduled', async () => {
    await expect(sync.scheduleTask('sync-timetable', 15)).rejects.toThrow(NotImplementedError);
  });

  it('cancelTask throws NotImplementedError rather than silently succeeding', async () => {
    await expect(sync.cancelTask('sync-timetable')).rejects.toThrow(NotImplementedError);
  });

  it('runNow throws NotImplementedError rather than fabricating a result', async () => {
    await expect(sync.runNow('sync-timetable')).rejects.toThrow(NotImplementedError);
  });
});
