import axios from 'axios';

export default async function GetMealPlans(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios('/api/mealplan', config);
  return res.data;
}
