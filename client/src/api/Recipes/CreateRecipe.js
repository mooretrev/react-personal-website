import axios from 'axios';
import RecipeBody from './RecipeBody.js';

const CreateRecipe = async (recipeName, recipeItems, ingredients, sizes, units) => {
  const reqBody = RecipeBody(recipeName, recipeItems, ingredients, sizes, units);
  try {
    await axios.post('/api/recipes', reqBody);
    return 0;
  } catch (err) {
    return -1;
  }
};

export default CreateRecipe;
