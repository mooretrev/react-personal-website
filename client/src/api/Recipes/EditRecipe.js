import axios from 'axios';
import RecipeBody from './RecipeBody.js';

const EditRecipe = async (token, id, recipeName, recipeItems, ingredients, sizes, units) => {
  const reqBody = RecipeBody(recipeName, recipeItems, ingredients, sizes, units);

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.put(`${process.env.REACT_APP_BASE_URL}/api/recipes/${id}`, reqBody, config);
    return 1;
  } catch (err) {
    return -1;
  }
};
export default EditRecipe;
