import refreshApiKey from '../refreshApiKey';
import loadApiToken from '../loadApiTokens';

test('should refresh api without error', async () => {
  const token = await loadApiToken();
  const res = await refreshApiKey(token.refresh_token);
  expect(res.access_token).not.toEqual('');
});
