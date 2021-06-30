import { AxiosRequestConfig } from 'axios';
import getApiToken from './getApiToken';

export default async function createTDAuthHeader(): Promise<AxiosRequestConfig> {

  const apiKey = await getApiToken()
  return {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };
}