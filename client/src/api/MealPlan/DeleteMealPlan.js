import axios from 'axios';

const DeleteRecipe = async (token, mealPlanId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`api/mealplan/${mealPlanId}`, config);
};

export default DeleteRecipe;
