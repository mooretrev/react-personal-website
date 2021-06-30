import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import { APITokens } from './APITokens';

export default async function refreshApiKey(refreshToken: string): Promise<APITokens> {
  const url = 'https://api.tdameritrade.com/v1/oauth2/token';
  const clientId = process.env.TD_API_CLIENT_ID;
  const params = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    access_type: 'offline',
    client_id: clientId,
  };

  const axoisConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const formParams = formurlencoded(params);
  try {
    const response = await axios.post<APITokens>(url, formParams, axoisConfig)
    return response.data
  } catch (err) {
    console.log(err)
  }
  return { access_token: '', refresh_token: '', time_stamp: 20 }
};
