import axios from 'axios';
import parseMealPlanRawData from './parseMealPlanRawData.js';

const EditRecipe = async (token, id, mealPlanData, startDay, date) => {
  const reqBody = parseMealPlanRawData(mealPlanData, startDay, date);

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(`/api/mealplan/${id}`, reqBody, config);
    return 1;
  } catch (err) {
    return -1;
  }
};
export default EditRecipe;
