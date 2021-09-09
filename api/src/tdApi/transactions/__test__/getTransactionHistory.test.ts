import getTransactionHistory, { MinTransactionHistory } from '../getTransactionHistory';
import historyFull from '../getTransactionHistoryFull';
import sampleTransactionData from './SampleTransactionHistory.json';

jest.mock('../getTransactionHistoryFull');

const mockGetTransactionHistory = historyFull as jest.MockedFunction<typeof historyFull>;
// Axios response request a lot of parameter to be filled when one the data field is being used
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mockGetTransactionHistory.mockResolvedValue({ data: sampleTransactionData });

test('should get minify transaction history', async () => {
  const accountId = 234234;
  const res = await getTransactionHistory(accountId);
  const ans: MinTransactionHistory[] = [
    {
      accountId,
      instruction: 'BUY',
      positionType: 'LONG',
      price: 516.33,
      quantity: 1,
      totalPrice: 516.33,
      transactionDate: '2021-07-23T18:23:00+0000',
      type: 'STOCK',
      ticker: 'NFLX',
    },
    {
      accountId,
      instruction: 'SELL',
      positionType: 'LONG',
      price: 148.52,
      quantity: 4,
      totalPrice: 594.08,
      transactionDate: '2021-07-19T13:38:02+0000',
      type: 'STOCK',
      ticker: 'JPM',
    },

  ];
  expect(res).toEqual(ans);
});
