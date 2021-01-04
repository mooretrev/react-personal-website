import GetRecipeNames from '../GetRecipeNames.js';

jest.mock('../GetRecipes', () => jest.fn(() => new Promise((res) => {
  const RecipeData = [
    {
      _id: { $oid: '5fa49f6153740fc72dd41de0' },
      recipe_name: 'Hot Cholocate',
      recipe_items: [
        {
          _id: { $oid: '5fcd6c31a9485974f07fa51d' },
          recipe_item: 'Ingredients',
          ingredients: [
            {
              _id: { $oid: '5fcd6c31a9485974f07fa51e' },
              ingredient: 'Unsweetened Cocoa Powder',
              size: '2',
              unit: 'Tbsp',
            },
            {
              _id: { $oid: '5fcd6c31a9485974f07fa51f' },
              ingredient: 'Brown Sugar',
              size: '1.5',
              unit: 'Tbsp',
            },
            {
              _id: { $oid: '5fcd6c31a9485974f07fa520' },
              ingredient: 'Milk',
              size: '1',
              unit: 'Cup',
            },
            {
              _id: { $oid: '5fcd6c31a9485974f07fa521' },
              ingredient: 'Vanilla Extract',
              size: '1/4',
              unit: 'Tsp',
            },
            {
              _id: { $oid: '5fcd6c31a9485974f07fa522' },
              ingredient: 'Milk',
              size: '1',
              unit: 'Cup',
            },
            {
              _id: { $oid: '5fcd6c31a9485974f07fa523' },
              ingredient: 'Salt',
              size: 'A pinch',
            },
          ],
        },
      ],
      __v: { $numberInt: '0' },
    },
    {
      _id: { $oid: '5fb476cd774eeef129170855' },
      recipe_name: 'Recipe',
      recipe_items: [
        {
          _id: { $oid: '5fc43355fc169e381c75c714' },
          recipe_item: 'Item',
          ingredients: [
            {
              _id: { $oid: '5fc43355fc169e381c75c715' },
              ingredient: 'one',
              size: '',
              unit: '',
            },
          ],
        },
        {
          _id: { $oid: '5fc43355fc169e381c75c716' },
          recipe_item: 'Item2',
          ingredients: [
            {
              _id: { $oid: '5fc43355fc169e381c75c717' },
              ingredient: 'two',
              size: '',
              unit: '',
            },
          ],
        },
        {
          _id: { $oid: '5fc43355fc169e381c75c718' },
          recipe_item: 'Item 3',
          ingredients: [],
        },
        {
          _id: { $oid: '5fc43355fc169e381c75c719' },
          recipe_item: 'Item 4',
          ingredients: [],
        },
      ],
      __v: { $numberInt: '0' },
    },
  ];

  res(RecipeData);
})));

test('Get Recipes Names', async () => {
  const res = await GetRecipeNames();
  expect(res).toEqual(['Hot Cholocate', 'Recipe']);
});
