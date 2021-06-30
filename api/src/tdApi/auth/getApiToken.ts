import writeApiData from './writeApiData';
import loadApiTokens from './loadApiTokens';
import { APITokens } from './APITokens';
import refreshApiKey from './refreshApiKey';

export default async function getApiToken() {
  const tokens: APITokens = await loadApiTokens();
  const currentTime = Math.floor(new Date().getTime() / 1000);
  let timeDiff = currentTime - tokens.time_stamp;
  if (timeDiff > 1600) {
    const newTokens = await refreshApiKey(tokens.refresh_token)
    writeApiData(newTokens);
    return newTokens.access_token
  } else {
    return tokens.access_token
  }
};
