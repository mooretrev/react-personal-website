import axios from 'axios';
import formurlencoded from 'form-urlencoded';
import { TDAuthTokenInterface } from '../../../model/TDAuthToken';
import refreshApiKey, { Params } from '../refreshApiKey'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>;

test('should get refresh token', async () => {
    mockAxios.post.mockResolvedValue({ access_token: 'access', refresh_token: 'refresh' })
    const clientId = 'id';
    process.env.TD_API_CLIENT_ID = clientId

    const tokens: TDAuthTokenInterface = {
        access_token: 'access',
        refresh_token: 'refresh',
        time_stamp: 2023092390,
        refresh_time_stamp: new Date().getTime() / 1000 - 5000000
    }
    await refreshApiKey(tokens)
    const url = 'https://api.tdameritrade.com/v1/oauth2/token'
    const params: Params = {
        grant_type: 'refresh_token',
        refresh_token: 'refresh',
        client_id: clientId,
        access_type: 'offline'
    }
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    expect(mockAxios.post).toHaveBeenCalledWith(url, formurlencoded(params), config)
});