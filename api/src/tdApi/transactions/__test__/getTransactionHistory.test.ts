import getAccountsJSON from '../../accounts/getAccountJSON';
import getTransationHistory from '../getTransactionHistory';

test('should get transaction history without error', async () => {
  const accounts = await getAccountsJSON();
  const history = await getTransationHistory(accounts.mooretrev);
});
