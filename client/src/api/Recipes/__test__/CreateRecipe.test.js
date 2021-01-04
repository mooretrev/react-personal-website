import RecipeBody from '../RecipeBody.js';

describe('create a proper body for the api create action', () => {
  it('even number of inputs', () => {
    const recipeName = 'Pizza';
    const recipeItems = ['Dough', 'Sauce', ''];
    const ingredients = [['Flour', 'Yeast', ''], ['Tomatos', 'Sugar', '']];
    const sizes = [['1', '1/4', ''], ['3', '1', '']];
    const units = [['Cup', 'Tsb', ''], ['Cup', 'Tsp', '']];

    const body = RecipeBody(recipeName, recipeItems, ingredients, sizes, units);

    const ans = {
      recipe_name: 'Pizza',
      recipe_items: [{
        recipe_item: 'Dough',
        ingredients: [{
          ingredient: 'Flour',
          size: '1',
          unit: 'Cup',
        },
        {
          ingredient: 'Yeast',
          size: '1/4',
          unit: 'Tsb',
        }],
      },
      {
        recipe_item: 'Sauce',
        ingredients: [{
          ingredient: 'Tomatos',
          size: '3',
          unit: 'Cup',
        },
        {
          ingredient: 'Sugar',
          size: '1',
          unit: 'Tsp',
        }],
      }],
    };

    expect(body).toEqual(ans);
  });

  it('odd number of inputs', () => {
    const recipeName = 'Pizza';
    const recipeItems = ['Dough', ''];
    const ingredients = [['Flour', 'Yeast', '']];
    const sizes = [['1', '1/4', '']];
    const units = [['Cup', 'Tsb', '']];

    const body = RecipeBody(recipeName, recipeItems, ingredients, sizes, units);

    const ans = {
      recipe_name: 'Pizza',
      recipe_items: [{
        recipe_item: 'Dough',
        ingredients: [{
          ingredient: 'Flour',
          size: '1',
          unit: 'Cup',
        },
        {
          ingredient: 'Yeast',
          size: '1/4',
          unit: 'Tsb',
        }],
      }],
    };

    expect(body).toEqual(ans);
  });
});
