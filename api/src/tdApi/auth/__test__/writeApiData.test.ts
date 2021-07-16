import writeApiData from "../writeApiData";
import { connect, close, clearDatabase } from '../../../db';
import TDAuthToken, { TDAuthToken as APIData } from '../../../model/TDAuthToken'
import { APIResponse } from "../refreshApiKey";

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

test('if there is no refresh token, use the old one', async () => {
    const data: APIData = {
        access_token: 'access',
        refresh_token: 'refresh',
        time_stamp: new Date().getTime() / 1000,
        refresh_time_stamp: new Date().getTime() / 1000
    }
    await TDAuthToken.create(data)

    const apiData: APIResponse = {
        access_token: 'newaccess'
    }
    const tokens: APIData = {
        access_token: 'access',
        refresh_token: 'refresh',
        time_stamp: new Date().getTime() / 1000,
        refresh_time_stamp: new Date().getTime() / 1000

    }
    await writeApiData(apiData, tokens)
    const res = await TDAuthToken.findOne({})
});