import getApiToken from '../getApiToken';

test('should get api token without error', async () => {
  const res = await getApiToken();
  expect(res).not.toEqual('');
});
