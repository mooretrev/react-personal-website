import StringCrypto from 'string-crypto';
import TDAuthToken, { TDAuthTokenModal as APITokens } from '../../model/TDAuthToken';
import { APIResponse } from './refreshApiKey';

const {
  encryptString,
} = new StringCrypto();

export default async function writeApiData(apiData: APIResponse, tokens: APITokens):
Promise<void> {
  const currentTime = Math.floor(new Date().getTime() / 1000);

  let data: APITokens;

  if (apiData.refresh_token === undefined) {
    data = {
      access_token: encryptString(apiData.access_token, process.env.TD_API_PASSCODE),
      refresh_token: tokens.refresh_token,
      time_stamp: currentTime,
      refresh_time_stamp: tokens.refresh_time_stamp,
    };
  } else {
    data = {
      access_token: encryptString(apiData.access_token, process.env.TD_API_PASSCODE),
      refresh_token: encryptString(apiData.refresh_token, process.env.TD_API_PASSCODE),
      time_stamp: currentTime,
      refresh_time_stamp: currentTime,
    };

    await TDAuthToken.findOneAndUpdate({}, data);
  }
}
