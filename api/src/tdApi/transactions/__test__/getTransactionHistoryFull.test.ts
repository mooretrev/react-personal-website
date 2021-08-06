import axios from 'axios';
import getTransactionHistoryFull from '../getTransactionHistoryFull';
import createTDAuthHeader from '../../auth/headers';

jest.mock('axios');
jest.mock('../../auth/headers');

const axiosMock = axios as jest.Mocked<typeof axios>;
const createTDAuthHeaderMock = createTDAuthHeader as jest.MockedFunction<typeof createTDAuthHeader>;

test('should get full transaction history without error', async () => {
  const accountNum = 28343;
  createTDAuthHeaderMock.mockResolvedValue({});
  await getTransactionHistoryFull(accountNum);
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 10);
  const endDateString = today.toISOString().split('T')[0];
  const startDateString = startDate.toISOString().split('T')[0];
  const url = `https://api.tdameritrade.com/v1/accounts/${accountNum}/transactions?type=TRADE&startDate=${startDateString}&endDate=${endDateString}`;
  expect(axiosMock.get).toHaveBeenLastCalledWith(url, {});
});
