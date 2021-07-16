import { TDAuthToken } from '../../../model/TDAuthToken'
import getApiToken from '../getApiToken'
import loadApiTokens from '../loadApiTokens'
import refreshApiKey, { APIResponse } from '../refreshApiKey'
import writeApiData from '../writeApiData'

jest.mock('../loadApiTokens')
jest.mock('../refreshApiKey')
jest.mock('../writeApiData')

const mockLoadApiTokens = loadApiTokens as jest.MockedFunction<typeof loadApiTokens>;
const mockRefreshApiKey = refreshApiKey as jest.MockedFunction<typeof refreshApiKey>;
const mockWriteApiData = writeApiData as jest.MockedFunction<typeof writeApiData>;

test('should not get new api tokens', async () => {
    const data: TDAuthToken = {
        access_token: 'access',
        refresh_token: 'refresh',
        time_stamp: (new Date().getTime() / 1000 - 900),
        refresh_time_stamp: new Date().getTime()
    }
    mockLoadApiTokens.mockResolvedValue(data)

    const res = await getApiToken()
    expect(res).toEqual('access')
})

test('should get new api tokens', async () => {
    const data: TDAuthToken = {
        access_token: 'access',
        refresh_token: 'refresh',
        time_stamp: (new Date().getTime() / 1000 - 3000),
        refresh_time_stamp: new Date().getTime()
    }

    const response: APIResponse = {
        access_token: 'newaccess',
        refresh_token: 'newrefresh'
    }

    mockLoadApiTokens.mockResolvedValue(data)
    mockRefreshApiKey.mockResolvedValue(response)

    const res = await getApiToken()
    expect(res).toEqual('newaccess')
    expect(mockWriteApiData).toBeCalled()
})