import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import isRefreshTokenNeeded from './isRefreshTokenNeeded';
import { TDAuthToken as APITokens } from '../../model/TDAuthToken';

export interface APIResponse {
  access_token: string;
  refresh_token?: string;
}

export interface Params {
  grant_type: string,
  refresh_token: string;
  client_id: string;
  access_type?: string;
}

export default async function refreshApiKey(tokens: APITokens): Promise<APIResponse> {
  const url = 'https://api.tdameritrade.com/v1/oauth2/token';
  const clientId = process.env.TD_API_CLIENT_ID as string;
  const params: Params = {
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
    client_id: clientId,
  };

  if (isRefreshTokenNeeded(tokens)) {
    params['access_type'] = 'offline'
  }

  const axoisConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const formParams = formurlencoded(params);
  const response = await axios.post<APIResponse>(url, formParams, axoisConfig)
  return response.data
};
