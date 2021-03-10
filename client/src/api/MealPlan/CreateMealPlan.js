import axios from 'axios';
import parseMealPlanRawData from './parseMealPlanRawData.js';

export default async function CreateMealPlan(mealPlanData, startDay, date) {
  const reqBody = parseMealPlanRawData(mealPlanData, startDay, date);
  try {
    await axios.post('/api/mealplan', reqBody);
    return 1;
  } catch (err) {
    return -1;
  }
}
