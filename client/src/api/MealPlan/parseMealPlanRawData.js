import daysOfTheWeek from '../../constants/daysOfTheWeek.js';
import getCurrentDayIndex from './getCurrentDayIndex.js';

export default function parseMealPlanRawData(mealPlanData, startDay, date) {
  const offset = daysOfTheWeek.indexOf(startDay);
  const mealPlan = [];
  let numDaysPlanned = 0;

  for (let i = 0; i < mealPlanData.length; i += 1) {
    if (mealPlanData[i] !== undefined && mealPlanData[i].length !== 0) {
      numDaysPlanned += 1;
      const day = daysOfTheWeek[getCurrentDayIndex(i, offset)];
      const mealPlanObj = {
        day,
        meals: mealPlanData[i],
      };

      mealPlan.push(mealPlanObj);
    }
  }

  return {
    date,
    startDay,
    numDaysPlanned,
    mealPlan,
  };
}
