import axios from 'axios';

export default async function GetMealPlans() {
  const res = await axios('/api/mealplan');
  return res.data;
}
