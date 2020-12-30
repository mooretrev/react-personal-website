import { getCurrentDay } from '../MealPlanHome.jsx';

test('return the correct index', () => {
  expect(getCurrentDay(0, 0)).toBe(0);
  expect(getCurrentDay(6, 0)).toBe(6);
  expect(getCurrentDay(0, 1)).toBe(1);
  expect(getCurrentDay(7, 7)).toBe(0);
});
