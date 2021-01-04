import getUniqueItems, { uniqueItems, make2DArray } from '../getUniqueItems.js';

const testData = {
  _id: '5ff288a87560904a4c541cd4',
  date: '2021-01-04T00:00:00.000Z',
  startDay: 'Sunday',
  numDaysPlanned: 2,
  mealPlan: [
    {
      meals: ['Hot Cholocate'],
      _id: '5ff288a87560904a4c541cd5',
      day: 'Sunday',
    },
    {
      meals: ['Hot Cholocate', 'Recipe'],
      _id: '5ff288a87560904a4c541cd6',
      day: 'Monday',
    }],
};

test('Get unique items', () => {
  const ans = ['Hot Cholocate', 'Recipe'];
  expect(getUniqueItems(testData)).toEqual(ans);
});

test('unique items', () => {
  const items = [
    ['Here', 'Here2', 'Here'],
    ['Here3', 'Here2', 'Here4'],
    ['Here'],
    ['Here5', 'Here2'],
  ];

  const ans = ['Here', 'Here2', 'Here3', 'Here4', 'Here5'];
  expect(uniqueItems(items)).toEqual(ans);
});

test('Make 2D array', () => {
  const ans = [['Hot Cholocate'], ['Hot Cholocate', 'Recipe']];
  expect(make2DArray(testData)).toEqual(ans);
});
