import {
  NextFunction,
} from 'express';
import validStockDate from '../validStockDate';

const mockNextFunction = jest.fn() as jest.MockedFunction<NextFunction>;

beforeEach(() => {
  mockNextFunction.mockClear();
});
test('valid stock data is passed', () => {
  const request = { body: { startDate: '2021-08-03', endDate: '2021-08-07' } };
  // @ts-ignore
  validStockDate(request, {}, mockNextFunction);
  expect(mockNextFunction).toHaveBeenCalled();
});

test('no stock dates are passed', () => {
  const request = { body: {} };
  // @ts-ignore
  validStockDate(request, {}, mockNextFunction);
  expect(mockNextFunction).toHaveBeenCalled();
});

test('start date > end date should throw 400', () => {
  const request = { body: { startDate: '2021-08-08', endDate: '2021-08-07' } };
  const status = jest.fn();
  const json = jest.fn();
  const end = jest.fn();
  const response = { status, json, end };
  // @ts-ignore
  validStockDate(request, response, mockNextFunction);
  expect(mockNextFunction).not.toHaveBeenCalled();
  expect(end).toHaveBeenCalled();
  expect(status).toHaveBeenCalledWith(400);
  expect(json).toHaveBeenCalledWith({ errorMessage: 'Start date cannot be after end date.' });
});

test('params are not dates should throw 400', () => {
  const request = { body: { startDate: 'bs', endDate: 'crap' } };
  const status = jest.fn();
  const json = jest.fn();
  const end = jest.fn();
  const response = { status, json, end };
  // @ts-ignore
  validStockDate(request, response, mockNextFunction);
  expect(mockNextFunction).not.toHaveBeenCalled();
  expect(end).toHaveBeenCalled();
  expect(status).toHaveBeenCalledWith(400);
  expect(json).toHaveBeenCalledWith({ errorMessage: 'Invalid inputs for either startDate or endDate' });
});
