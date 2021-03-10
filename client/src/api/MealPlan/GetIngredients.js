import GetRecipes from '../Recipes/GetRecipes.js';

export async function getRequiredRecipes(recipeNames) {
  const recipes = await GetRecipes();
  const requiredRecipes = [];
  recipes.map((recipe) => {
    if (recipeNames.includes(recipe.recipe_name)) {
      requiredRecipes.push(recipe);
    }
    return 0;
  });
  return requiredRecipes;
}

export function parseIntoIngredients(recipes) {
  const ingredients = [];
  recipes.map((recipe) => {
    recipe.recipe_items.map((recipeItem) => {
      recipeItem.ingredients.map((ingredient) => {
        ingredients.push(ingredient.ingredient);
        return 0;
      });
      return 0;
    });
    return 0;
  });
  return ingredients;
}

export function uniqueItems(items) {
  const retval = [];
  items.map((item) => {
    if (!retval.includes(item)) {
      retval.push(item);
    }
    return 0;
  });
  return retval;
}

export default async function GetIngredients(recipeNames) {
  const requiredRecipes = await getRequiredRecipes(recipeNames);
  const ingredientsDups = parseIntoIngredients(requiredRecipes);
  return uniqueItems(ingredientsDups);
}
