import path from 'path'
import { APITokens } from './APITokens';
const { encrypt } = require('encrypt_strings');

export default function writeApiData(apiData: APITokens) {
  const currentTime = Math.floor(new Date().getTime() / 1000);

  const data = {
    access_token: apiData.access_token,
    refresh_token: apiData.refresh_token,
    time_stamp: currentTime,
  };

  encrypt(JSON.stringify(data), process.env.TD_API_PASSCODE, path.join(__dirname, '../tokens/data.json.enc'));
};
