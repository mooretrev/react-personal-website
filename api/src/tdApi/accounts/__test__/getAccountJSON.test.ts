import getAccountJSON from '../getAccountJSON';

test('should get accounts JSON without error', async () => {
  const accounts = await getAccountJSON();
  expect(accounts).not.toEqual({});
});
