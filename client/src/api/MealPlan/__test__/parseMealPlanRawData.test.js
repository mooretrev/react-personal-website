import parseMealPlanRawData from '../parseMealPlanRawData.js';

test('parse meel plan raw data', () => {
  const mealPlanRawData = [
    ['Coffee', 'Grilled Cheese'],
    ['Milk', 'Pudding', 'Apple Juice'],
    ['Water'],
    [],
  ];

  const startDay = 'Monday';
  const date = '2020-01-01';

  const res = parseMealPlanRawData(mealPlanRawData, startDay, date);

  const ans = {
    date,
    startDay,
    numDaysPlanned: mealPlanRawData.length - 1,
    mealPlan: [
      {
        day: 'Monday',
        meals: ['Coffee', 'Grilled Cheese'],
      },
      {
        day: 'Tuesday',
        meals: ['Milk', 'Pudding', 'Apple Juice'],
      },
      {
        day: 'Wednesday',
        meals: ['Water'],
      },
    ],
  };

  expect(res).toEqual(ans);
});
