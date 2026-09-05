import { NotImplementedError } from '../errors';
import { StubPushNotifications } from '../pushNotifications';

describe('StubPushNotifications', () => {
  const push = new StubPushNotifications();

  it('requestPermission throws NotImplementedError rather than claiming a grant', async () => {
    await expect(push.requestPermission()).rejects.toThrow(NotImplementedError);
  });

  it('getDeviceToken throws NotImplementedError rather than returning a fake token', async () => {
    await expect(push.getDeviceToken()).rejects.toThrow(NotImplementedError);
  });

  it('onNotificationReceived throws NotImplementedError rather than silently no-op subscribing', () => {
    expect(() => push.onNotificationReceived(() => undefined)).toThrow(NotImplementedError);
  });
});
