import headers from '../headers'
import getApiToken from '../getApiToken'
jest.mock('../getApiToken')

const mockGetApiToken = getApiToken as jest.MockedFunction<typeof getApiToken>;

test('correct header returned', async () => {
    mockGetApiToken.mockResolvedValue('token')
    const res = await headers();
    expect(res).toEqual({ headers: { Authorization: 'Bearer token' } })
})