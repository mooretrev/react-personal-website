import writeApiData from './writeApiData';
import loadApiTokens from './loadApiTokens';
import { TDAuthTokenModal } from '../../model/TDAuthToken';
import refreshApiKey from './refreshApiKey';

export default async function getApiToken(): Promise<string> {
  const tokens: TDAuthTokenModal = await loadApiTokens();
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const timeDiff = currentTime - tokens.time_stamp;
  if (timeDiff > 1600) {
    const newTokens = await refreshApiKey(tokens);
    writeApiData(newTokens, tokens);
    return newTokens.access_token;
  }
  return tokens.access_token;
}
