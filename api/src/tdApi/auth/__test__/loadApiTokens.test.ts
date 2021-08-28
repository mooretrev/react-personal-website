import StringCrypto from 'string-crypto';
import TDAuthToken, { TDAuthTokenModal as APIToken } from '../../../model/TDAuthToken';
import loadApiTokens from '../loadApiTokens';
import { connect, close, clearDatabase } from '../../../db';

const {
  encryptString,
} = new StringCrypto();

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

test('should load and decrypt api tokens', async () => {
  const passcode = 'password';
  process.env.TD_API_PASSCODE = passcode;
  const tokens: APIToken = {
    access_token: encryptString('access', passcode),
    refresh_token: encryptString('refresh', passcode),
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000,
  };
  await TDAuthToken.create(tokens);
  const res = await loadApiTokens();
  expect(res.access_token).toEqual('access');
  expect(res.refresh_token).toEqual('refresh');
});
