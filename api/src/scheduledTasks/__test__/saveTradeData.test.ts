import saveTradeData from '../saveTradeData';
import getTransactionHistory, { MinTransactionHistory } from '../../tdApi/transactions/getTransactionHistory';
import getAccountsJSON from '../../tdApi/accounts/getAccountJSON';
import sampleTransactionHisory from './SampleTransactionHistory.json';
import StockPosition, { StockPositionInterface } from '../../model/stockPosition';
import { connect, close, clearDatabase } from '../../db';

jest.mock('../../tdApi/accounts/getAccountJSON');
jest.mock('../../tdApi/transactions/getTransactionHistory');

const mockGetTransactionHistory = getTransactionHistory as jest.MockedFunction<typeof getTransactionHistory>;
const mockGetAccountsJSON = getAccountsJSON as jest.MockedFunction<typeof getAccountsJSON>;

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

// TODO
test('should save trade data', async () => {
  mockGetAccountsJSON.mockResolvedValue({
    mooretrev: 2389432,
  });
  mockGetTransactionHistory.mockResolvedValue(sampleTransactionHisory as MinTransactionHistory[]);
  const jpmDoc = {
    instrumentType: 'STOCK',
    positionType: 'LONG',
    entryDate: new Date('2021-07-23T12:00'),
    entryPrice: 140,
    quantity: 4,
    ticker: 'JPM',
  };
  await StockPosition.create(jpmDoc);
  await saveTradeData();

  const ansJpmDoc: StockPositionInterface = await StockPosition.findOne({ ticker: 'JPM' });
  expect(ansJpmDoc.exitDate).toEqual(new Date('2021-07-19T13:38'));
  expect(ansJpmDoc.exitPrice).toEqual(148.52);

  const ansGmeDoc: StockPositionInterface = await StockPosition.findOne({ ticker: 'GME' });
  expect(ansGmeDoc.entryPrice).toBe(250);
  expect(ansGmeDoc.exitPrice).toBe(300);
  expect(ansGmeDoc.positionType).toEqual('LONG');
  expect(ansGmeDoc.quantity).toBe(2);
  expect(ansGmeDoc.entryDate).toEqual(new Date('2021-08-23T18:30'));
  expect(ansGmeDoc.exitDate).toEqual(new Date('2021-08-26T18:30'));

  const ansNflxDoc: StockPositionInterface = await StockPosition.findOne({ ticker: 'NFLX' });
  expect(ansNflxDoc.positionType).toEqual('LONG');
  expect(ansNflxDoc.quantity).toBe(1);
  expect(ansNflxDoc.entryPrice).toBe(516.33);
  expect(ansNflxDoc.entryDate).toEqual(new Date('2021-07-23T18:23'));
});
