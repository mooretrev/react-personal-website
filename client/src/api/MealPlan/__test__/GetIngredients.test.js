import GetIngredients, { getRequiredRecipes, parseIntoIngredients } from '../GetIngredients.js';
import GetRecipes from '../../Recipes/GetRecipes.js';
import recipeData from './__data__/fakeRecipeData.js';

jest.mock('../../Recipes/GetRecipes.js');

GetRecipes.mockImplementation(() => new Promise((res) => {
  res(recipeData);
}));

test('getRequiredRecipes', async () => {
  const res = await getRequiredRecipes(['Hot Cholocate', 'Recipe']);

  expect(res).toHaveLength(2);
  expect(res[0].recipe_name).toEqual('Hot Cholocate');
  expect(res[1].recipe_name).toEqual('Recipe');
});

test('parseIntoIngredients', () => {
  const res = parseIntoIngredients(recipeData);
  const ans = ['Powder', 'Sugar', 'Extract', 'Milk', 'Egg', 'Milk', 'Sugar', 'Water'];
  expect(res).toEqual(ans);
});

test('GetIngredients', async () => {
  const res = await GetIngredients(['Hot Cholocate', 'Recipe']);
  const ans = ['Powder', 'Sugar', 'Extract', 'Milk', 'Water'];
  expect(res).toEqual(ans);
});
