import StockPosition, { StockPositionModel } from '../stockPosition';
import { connect, close, clearDatabase } from '../../db';

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

test('should make the correct virtual field based on the data', async () => {
  const stockPosition: StockPositionModel = await StockPosition.create({
    ticker: 'TSLA',
    entryDate: new Date('2021-08-22T08:30'),
    totalEntryPrice: 500,
    totalExitPrice: 600,
    quantityClosed: 2,
    exitDate: new Date('2021-08-30T08:30'),
    positionType: 'LONG',
    instrumentType: 'STOCK',
    quantity: 2,
  });
  expect(stockPosition.entryPrice).toBe(250);
  expect(stockPosition.exitPrice).toBe(300);
  expect(stockPosition.gainOrLoss).toBe(100);
  expect(stockPosition.closed).toBe(true);
});

test('should make the correct virtual field when only has entry data', async () => {
  const doc: StockPositionModel = {
    entryDate: new Date('2021-07-25T08:30'),
    totalEntryPrice: 400,
    ticker: 'TSLA',
    positionType: 'LONG',
    instrumentType: 'STOCK',
    quantity: 2,
    quantityClosed: 0,
  };
  const stockPosition: StockPositionModel = await StockPosition.create(doc);
  expect(stockPosition.entryPrice).toBe(200);
  expect(stockPosition.gainOrLoss).toBe(null);
  expect(stockPosition.exitPrice).toBe(null);
});
