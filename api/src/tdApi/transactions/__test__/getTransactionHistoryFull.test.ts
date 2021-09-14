import axios from 'axios';
import getTransactionHistoryFull from '../getTransactionHistoryFull';
import createTDAuthHeader from '../../auth/headers';

jest.mock('axios');
jest.mock('../../auth/headers');

const axiosMock = axios as jest.Mocked<typeof axios>;
const createTDAuthHeaderMock = createTDAuthHeader as jest.MockedFunction<typeof createTDAuthHeader>;

beforeEach(() => {
  axiosMock.get.mockClear();
});

test('should get full transaction history without error', async () => {
  const accountNum = 28343;
  createTDAuthHeaderMock.mockResolvedValue({});
  await getTransactionHistoryFull(accountNum);
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 30);
  const endDateString = today.toISOString().split('T')[0];
  const startDateString = startDate.toISOString().split('T')[0];
  const url = `https://api.tdameritrade.com/v1/accounts/${accountNum}/transactions?type=TRADE&startDate=${startDateString}&endDate=${endDateString}`;
  expect(axiosMock.get).toHaveBeenLastCalledWith(url, {});
});

test('should get full transaction history without error with date range', async () => {
  const accountNum = 28343;
  createTDAuthHeaderMock.mockResolvedValue({});
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 60);
  const endDateString = today.toISOString().split('T')[0];
  const startDateString = startDate.toISOString().split('T')[0];
  await getTransactionHistoryFull(accountNum, startDate, today);
  const url = `https://api.tdameritrade.com/v1/accounts/${accountNum}/transactions?type=TRADE&startDate=${startDateString}&endDate=${endDateString}`;
  expect(axiosMock.get).toHaveBeenLastCalledWith(url, {});
});
