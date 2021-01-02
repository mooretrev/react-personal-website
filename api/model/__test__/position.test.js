import mongoose from 'mongoose';
import Position from '../position.js';

describe('Position Model Validation', () => {
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
  it('stock position no option resolves', async () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      ticker: 'TSLA',
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: false,
      open: true,
    };
    const newPosition = await Position.create(position);
    expect(newPosition.ticker).toBe('TSLA');
  });
  it('stock position option data resolves', async () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      ticker: 'TSLA',
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: true,
      callPut: 'CALL',
      expirationDate: '2020-01-15',
      strike: 700,
      open: true,
    };
    const newPosition = await Position.create(position);
    expect(newPosition.ticker).toBe('TSLA');
  });
  it('stock position option data put resolves', async () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      ticker: 'TSLA',
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: true,
      callPut: 'PUT',
      expirationDate: '2020-01-15',
      strike: 700,
      open: true,
    };
    const newPosition = await Position.create(position);
    expect(newPosition.ticker).toBe('TSLA');
  });
  it('stock position no ticker reject', () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: true,
      callPut: 'CALL',
      expirationDate: '2020-01-15',
      strike: 700,
      open: true,
    };
    expect(Position.create(position)).rejects.toThrow();
  });
  it('stock position no option data reject', () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      ticker: 'TSLA',
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: true,
      expirationDate: '2020-01-15',
      strike: 700,
      open: true,
    };
    expect(Position.create(position)).rejects.toThrow();
  });
  it('stock position no close data reject', () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      ticker: 'TSLA',
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: false,
      open: false,
    };
    expect(Position.create(position)).rejects.toThrow();
  });
  it('stock position wrong input for callPut reject', () => {
    const position = {
      _id: mongoose.Types.ObjectId(),
      ticker: 'TSLA',
      averagePrice: 504.35,
      marketValue: 4039.53,
      quantity: 5,
      option: true,
      callPut: 'call',
      expirationDate: '2020-01-15',
      strike: 700,
      open: true,
    };
    expect(Position.create(position)).rejects.toThrow();
  });
});
