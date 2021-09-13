import StringCrypto from 'string-crypto';
import writeApiData from '../writeApiData';
import { connect, close, clearDatabase } from '../../../db';
import TDAuthToken, { TDAuthTokenModal as APIData, TDAuthTokenModal } from '../../../model/TDAuthToken';
import { APIResponse } from '../refreshApiKey';

const {
  decryptString,
} = new StringCrypto();

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

test('if there is no refresh token, use the old one', async () => {
  const data: APIData = {
    access_token: 'access',
    refresh_token: 'refresh',
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000,
  };
  await TDAuthToken.create(data);

  const apiData: APIResponse = {
    access_token: 'newaccess',
  };
  const tokens: APIData = {
    access_token: 'access',
    refresh_token: 'refresh',
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000,

  };
  await writeApiData(apiData, tokens);
  const res: TDAuthTokenModal = await TDAuthToken.findOne({});
  expect(res.refresh_token).toEqual('refresh');
});

test('if there is a refresh token, use the new one', async () => {
  const data: APIData = {
    access_token: 'access',
    refresh_token: 'refresh',
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000,
  };
  await TDAuthToken.create(data);

  const apiData: APIResponse = {
    access_token: 'newaccess',
    refresh_token: 'newrefresh',
  };
  const tokens: APIData = {
    access_token: 'access',
    refresh_token: 'refresh',
    time_stamp: new Date().getTime() / 1000,
    refresh_time_stamp: new Date().getTime() / 1000,

  };
  await writeApiData(apiData, tokens);
  const res: TDAuthTokenModal = await TDAuthToken.findOne({});
  const decryptedRes = decryptString(res.refresh_token, process.env.TD_API_PASSCODE);
  expect(decryptedRes).toEqual('newrefresh');
});
