import axios from 'axios';
import RecipeBody from './RecipeBody.js';

const CreateRecipe = async (token, recipeName, recipeItems, ingredients, sizes, units) => {
  const reqBody = RecipeBody(recipeName, recipeItems, ingredients, sizes, units);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.post('/api/recipes', reqBody, config);
    return 0;
  } catch (err) {
    return -1;
  }
};

export default CreateRecipe;
