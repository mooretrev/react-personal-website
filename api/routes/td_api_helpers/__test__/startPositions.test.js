import mongoose from 'mongoose';
import tdAPI from 'td_ameritrade_api';
import startPositions, {
  parseOptionDate, isOptionTicker, parseOptionTicker, parseCallPut, parseStrikePrice,
} from '../startPositions.js';
import position from './positions.json';
import Position from '../../../model/position.js';

tdAPI.getCurrentPositionsPromise = jest.fn(() => new Promise((res) => {
  res(JSON.stringify(position));
}));

jest.mock('../../../jwtCheck.js', () => jest.fn((req, res, next) => {
  next();
}));

describe('start position', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Position.deleteMany({});
  });

  test('Start Position test', async () => {
    await Position.deleteMany({});

    const docs = [
      {
        _id: mongoose.Types.ObjectId(),
        ticker: 'GPS',
        averagePrice: 1.56,
        marketValue: 148.5,
        quantity: 1,
        option: false,
        open: true,
      },
      {
        _id: mongoose.Types.ObjectId(),
        ticker: 'AAPL',
        averagePrice: 121.09,
        marketValue: 1455.36,
        quantity: 12,
        option: false,
        open: true,
      },
    ];
    await Position.insertMany(docs);
    await startPositions();
    await new Promise((r) => setTimeout(r, 500));
    const res = await Position.find({});
    expect(res).toHaveLength(7);
    const ans = ['AAPL', 'BA', 'GPS', 'BBY', 'HD'];
    res.map((doc) => {
      expect(ans.includes(doc));
      return 0;
    });
  });
});

describe('helper functions', () => {
  test('is option ticker', () => {
    expect(isOptionTicker('TSLA')).toBe(false);
    expect(isOptionTicker('GPS_011521C22')).toBe(true);
  });

  test('parse option date', () => {
    const res = parseOptionDate('GPS_011521C22');
    const ans = new Date(2021, 1, 15);
    expect(res).toEqual(ans);

    expect(parseOptionDate('TSLA')).toBeUndefined();
  });

  test('parse option ticker', () => {
    expect(parseOptionTicker('GPS_011521C22')).toBe('GPS');
  });

  test('parse option call put', () => {
    expect(parseCallPut('GPS_011521C22')).toBe('CALL');
    expect(parseCallPut('GPS_011521P22')).toBe('PUT');
  });

  test('parse option strike price', () => {
    expect(parseStrikePrice('GPS_011521C22')).toBe('22');
    expect(parseStrikePrice('GPS_011521P222')).toBe('222');
  });
});
