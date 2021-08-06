import getTransactionHistory, { MinTransactionHistory } from '../getTransactionHistory';
import getTransactionHistoryFull from '../getTransactionHistoryFull';
import sampleTransactionData from './SampleTransactionHistory.json';

jest.mock('../getTransactionHistoryFull');

const mockGetTransactionHistory = getTransactionHistoryFull as jest.MockedFunction<typeof getTransactionHistoryFull>;
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
      transactionDate: new Date('2021-07-23T18:23:00+0000'),
      type: 'STOCK',
    },
    {
      accountId,
      instruction: 'SELL',
      positionType: 'LONG',
      price: 148.52,
      quantity: 4,
      totalPrice: 594.08,
      transactionDate: new Date('2021-07-19T13:38:02+0000'),
      type: 'STOCK',
    },

  ];
  expect(res).toEqual(ans);
});
