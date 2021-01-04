import getCurrentDayIndex from '../getCurrentDayIndex.js';

test('return the correct index', () => {
  expect(getCurrentDayIndex(0, 0)).toBe(0);
  expect(getCurrentDayIndex(6, 0)).toBe(6);
  expect(getCurrentDayIndex(0, 1)).toBe(1);
  expect(getCurrentDayIndex(7, 7)).toBe(0);
});
