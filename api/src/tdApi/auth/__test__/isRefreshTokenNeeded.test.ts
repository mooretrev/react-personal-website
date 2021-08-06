import { TDAuthTokenInterface } from '../../../model/TDAuthToken';
import isRefreshTokenNeeded from '../isRefreshTokenNeeded';

test('refresh token should be needed', () => {
  const tokens: TDAuthTokenInterface = {
    access_token: 'access',
    refresh_token: 'refresh',
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000 - 5000000,
  };
  const res = isRefreshTokenNeeded(tokens);
  expect(res).toBe(true);
});

test('refresh token should not be needed', () => {
  const tokens: TDAuthTokenInterface = {
    access_token: 'access',
    refresh_token: 'refresh',
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000 - 4000,
  };
  const res = isRefreshTokenNeeded(tokens);
  expect(res).toBe(false);
});
