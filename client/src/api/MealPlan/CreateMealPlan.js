import axios from 'axios';
import parseMealPlanRawData from './parseMealPlanRawData.js';

export default async function CreateMealPlan(token, mealPlanData, startDay, date) {
  const reqBody = parseMealPlanRawData(mealPlanData, startDay, date);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post('/api/mealplan', reqBody, config);
    return 1;
  } catch (err) {
    return -1;
  }
}
