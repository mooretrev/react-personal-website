import tdAPI from 'td_ameritrade_api';
import mongoose from 'mongoose';
import Position from '../../model/position.js';

export function isOptionTicker(ticker) {
  return ticker.includes('_');
}

export function parseOptionDate(ticker) {
  if (isOptionTicker(ticker)) {
    const index = ticker.indexOf('_');
    const month = ticker.substring(index + 1, index + 3);
    const day = ticker.substring(index + 3, index + 5);
    const yearStr = ticker.substring(index + 5, index + 7);
    const year = parseInt(yearStr, 10) + 2000;
    return new Date(year, month, day);
  }
  return undefined;
}

export function parseCallPut(ticker) {
  if (isOptionTicker(ticker)) {
    const index = ticker.indexOf('_');
    const callPut = ticker.substring(index + 7, index + 8);
    if (callPut === 'C') return 'CALL';
    return 'PUT';
  }
  return undefined;
}

export function parseOptionTicker(ticker) {
  if (isOptionTicker(ticker)) {
    const index = ticker.indexOf('_');
    return ticker.substring(0, index);
  }
  return ticker;
}

export function parseStrikePrice(ticker) {
  if (isOptionTicker(ticker)) {
    const index = ticker.indexOf('_');
    return ticker.substring(index + 8, ticker.length);
  }
  return undefined;
}

export default async function startPositions() {
  const currentPositionsStr = await tdAPI.getCurrentPositionsPromise();
  const currentPositions = JSON.parse(currentPositionsStr);

  const items = Object.keys(currentPositions);
  await items.map(async (key) => {
    const value = currentPositions[key];

    await value.positions.map(async (position) => {
      const query = {
        ticker: parseOptionTicker(position.ticker),
        averagePrice: position.averagePrice,
        quantity: position.quantity,
      };

      const docs = await Position.find(query);
      if (docs === undefined || docs.length === 0) {
        let doc;
        if (isOptionTicker(position.ticker)) {
          doc = {
            _id: mongoose.Types.ObjectId(),
            ticker: parseOptionTicker(position.ticker),
            averagePrice: position.averagePrice,
            marketValue: position.marketValue,
            quantity: position.quantity,
            option: true,
            callPut: parseCallPut(position.ticker),
            expirationDate: parseOptionDate(position.ticker),
            strike: parseStrikePrice(position.ticker),
            open: true,
          };
        } else {
          doc = {
            _id: mongoose.Types.ObjectId(),
            ticker: position.ticker,
            averagePrice: position.averagePrice,
            marketValue: position.marketValue,
            quantity: position.quantity,
            option: false,
            open: true,
          };
        }
        Position.create(doc);
      }
    });
  });
}
