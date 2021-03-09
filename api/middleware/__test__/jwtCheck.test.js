import jwtCheck from '../jwtCheck.js';

jest.mock('jsonwebtoken');

test('jwtCheck Test', () => {
  const next = jest.fn();
  jwtCheck({ headers: { authorization: 'Bearer joidsjfoijwfjds' } }, { status: jest.fn() }, next);
  expect(next).toHaveBeenCalled();
});
