import mongoose from 'mongoose';
import startPositions from '../startPositions.js';
import positions from './positions.json';
import tdAPI from 'td_ameritrade_api';

tdAPI.getCurrentPositionsPromise = jest.fn(() => {
  return new Promise((res, rej) => {
    
    res()
  })
})

// jest.mock('td_ameritrade_api', () => )

jest.mock('../../jwtCheck.js', () => jest.fn((req, res, next) => {
  next();
}));

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

test('Start Position test', async () => {
  startPositions();
});
