import axios from 'axios';
import RecipeBody from './RecipeBody.js';

const EditRecipe = async (id, recipeName, recipeItems, ingredients, sizes, units) => {
  const reqBody = RecipeBody(recipeName, recipeItems, ingredients, sizes, units);

  try {
    await axios.put(`/api/recipes/${id}`, reqBody);
    return 1;
  } catch (err) {
    return -1;
  }
};
export default EditRecipe;
