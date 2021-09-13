import saveTradeData from '../saveTradeData';
import History, { MinTransactionHistory } from '../../tdApi/transactions/getTransactionHistory';
import getAccountsJSON from '../../tdApi/accounts/getAccountJSON';
import sampleTransactionHisory from './SampleTransactionHistory.json';
import StockPosition, { StockPositionInterface, StockPositionModel } from '../../model/stockPosition';
import { connect, close, clearDatabase } from '../../db';

jest.mock('../../tdApi/accounts/getAccountJSON');
jest.mock('../../tdApi/transactions/getTransactionHistory');

const mockGetTransactionHistory = History as jest.MockedFunction<typeof History>;
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
  const jpmDoc: StockPositionModel = {
    instrumentType: 'STOCK',
    positionType: 'LONG',
    entryDate: new Date('2021-07-23T12:00'),
    totalEntryPrice: 140 * 4,
    quantity: 4,
    quantityClosed: 0,
    ticker: 'JPM',
  };
  await StockPosition.create(jpmDoc);
  await saveTradeData();
  await saveTradeData();

  const ansJpmDocs: StockPositionInterface[] = await StockPosition.find({ ticker: 'JPM' });
  expect(ansJpmDocs).toHaveLength(1);

  const ansJpmDoc: StockPositionInterface = await StockPosition.findOne({ ticker: 'JPM' });
  expect(ansJpmDoc.exitDate).toEqual(new Date('2021-07-19T13:38'));
  expect(ansJpmDoc.totalExitPrice).toEqual(594.08);

  const ansGmeDoc: StockPositionInterface = await StockPosition.findOne({ ticker: 'GME' });
  expect(ansGmeDoc.totalEntryPrice).toBe(700);
  expect(ansGmeDoc.totalExitPrice).toBe(910);
  expect(ansGmeDoc.positionType).toEqual('LONG');
  expect(ansGmeDoc.quantity).toBe(3);
  expect(ansGmeDoc.entryDate).toEqual(new Date('2021-08-23T18:30'));
  expect(ansGmeDoc.exitDate).toEqual(new Date('2021-08-30T18:30'));

  const ansNflxDoc: StockPositionInterface = await StockPosition.findOne({ ticker: 'NFLX' });
  expect(ansNflxDoc.positionType).toEqual('LONG');
  expect(ansNflxDoc.quantity).toBe(1);
  expect(ansNflxDoc.totalEntryPrice).toBe(516.33);
  expect(ansNflxDoc.entryDate).toEqual(new Date('2021-07-23T18:23'));
});
