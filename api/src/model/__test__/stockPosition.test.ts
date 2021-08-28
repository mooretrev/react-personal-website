import StockPosition, { StockPositionModel } from '../stockPosition';
import { connect, close, clearDatabase } from '../../db';

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

test('should make the correct virtual field based on the data', async () => {
  const stockPosition: StockPositionModel = await StockPosition.create({
    ticker: 'TSLA',
    entryDate: new Date('2021-08-22T08:30'),
    entryPrice: 250,
    exitPrice: 300,
    exitDate: new Date('2021-08-30T08:30'),
    positionType: 'LONG',
    instrumentType: 'STOCK',
    quantity: 2,
  });
  expect(stockPosition.initialPositionSize).toBe(500);
  expect(stockPosition.gainOrLoss).toBe(100);
  expect(stockPosition.finalPositionSize).toBe(600);
});

test('should make the correct virtual field when only has entry data', async () => {
  const doc: StockPositionModel = {
    entryDate: new Date('2021-07-25T08:30'),
    entryPrice: 200,
    ticker: 'TSLA',
    positionType: 'LONG',
    instrumentType: 'STOCK',
    quantity: 2,
  };
  const stockPosition: StockPositionModel = await StockPosition.create(doc);
  expect(stockPosition.initialPositionSize).toBe(400);
  expect(stockPosition.gainOrLoss).toBe(null);
  expect(stockPosition.finalPositionSize).toBe(null);
});
