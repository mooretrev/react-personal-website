import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import isRefreshTokenNeeded from './isRefreshTokenNeeded';
import { TDAuthTokenModal as APITokens } from '../../model/TDAuthToken';

export interface APIResponse {
  access_token: string; // eslint-disable-line camelcase
  refresh_token?: string; // eslint-disable-line camelcase
}

export interface Params {
  grant_type: string, // eslint-disable-line camelcase
  refresh_token: string; // eslint-disable-line camelcase
  client_id: string; // eslint-disable-line camelcase
  access_type?: string; // eslint-disable-line camelcase
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
    params.access_type = 'offline';
  }

  const axoisConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const formParams = formurlencoded(params);
  const response = await axios.post<APIResponse>(url, formParams, axoisConfig);
  return response.data;
}
