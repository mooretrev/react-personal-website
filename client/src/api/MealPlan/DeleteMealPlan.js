import axios from 'axios';

const DeleteRecipe = async (mealPlanId) => {
  await axios.delete(`api/mealplan/${mealPlanId}`);
};

export default DeleteRecipe;
