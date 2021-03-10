import GetRecipes from './GetRecipes.js';

export default async function GetRecipeNames() {
  const recipes = await GetRecipes();
  const items = [];
  for (let i = 0; i < recipes.length; i += 1) {
    items.push(recipes[i].recipe_name);
  }

  return items;
}
