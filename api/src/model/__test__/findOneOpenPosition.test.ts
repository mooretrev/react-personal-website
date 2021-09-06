import { connect, close, clearDatabase } from '../../db';
import StockPosition, { StockPositionModel } from '../stockPosition';
import { findOneOpenPosition } from '../stockPositionQueries';

beforeAll(async () => await connect());
beforeEach(async () => await clearDatabase());
afterAll(async () => await close());

test('no open positions', async () => {
  await StockPosition.create({
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
  const res = await findOneOpenPosition('TSLA');
  expect(res).toBe(null);
});

test('one open position', async () => {
  await StockPosition.create({
    ticker: 'PYPL',
    entryDate: new Date('2021-08-22T08:30'),
    totalEntryPrice: 500,
    totalExitPrice: 600,
    quantityClosed: 1,
    exitDate: new Date('2021-08-30T08:30'),
    positionType: 'LONG',
    instrumentType: 'PYPL',
    quantity: 2,
  });
  const res = await findOneOpenPosition('PYPL');
  expect(res?.quantity).toBe(2);
});

test('too many open positions', async () => {
  await StockPosition.create({
    ticker: 'AAPL',
    entryDate: new Date('2021-08-22T08:30'),
    totalEntryPrice: 500,
    totalExitPrice: 600,
    quantityClosed: 1,
    exitDate: new Date('2021-08-30T08:30'),
    positionType: 'LONG',
    instrumentType: 'STOCK',
    quantity: 2,
  });
  await StockPosition.create({
    ticker: 'AAPL',
    entryDate: new Date('2021-08-22T08:30'),
    totalEntryPrice: 500,
    totalExitPrice: 600,
    quantityClosed: 1,
    exitDate: new Date('2021-08-30T08:30'),
    positionType: 'LONG',
    instrumentType: 'STOCK',
    quantity: 2,
  });
  return expect(findOneOpenPosition('AAPL')).rejects.toThrow(Error);
});
