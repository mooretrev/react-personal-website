import axois from 'axios';

const GetRecipe = async (id) => {
  const url = `/api/mealplan/${id}`;
  const res = await axois.get(url);
  return res.data;
};

export default GetRecipe;
