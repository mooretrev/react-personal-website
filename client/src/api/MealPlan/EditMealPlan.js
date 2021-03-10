import axios from 'axios';
import parseMealPlanRawData from './parseMealPlanRawData.js';

const EditRecipe = async (id, mealPlanData, startDay, date) => {
  const reqBody = parseMealPlanRawData(mealPlanData, startDay, date);

  try {
    await axios.put(`/api/mealplan/${id}`, reqBody);
    return 1;
  } catch (err) {
    return -1;
  }
};
export default EditRecipe;
