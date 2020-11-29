const RecipeBody = (
  recipeNameParam,
  recipeItemsParam,
  ingredientsParam,
  sizesParam,
  unitsParam,
) => {
  const body = {};
  body.recipe_name = recipeNameParam;
  const recipeItems = [];
  for (let i = 0; i < recipeItemsParam.length; i += 1) {
    if (recipeItemsParam[i] !== '') {
      const recipeItem = {};
      recipeItem.recipe_item = recipeItemsParam[i];
      const ingredientsList = [];
      for (let j = 0; ingredientsParam[i] && j < ingredientsParam[i].length; j += 1) {
        if (ingredientsParam[i][j] !== '') {
          const ingredientObj = {};
          ingredientObj.ingredient = ingredientsParam[i][j];
          ingredientObj.size = sizesParam[i][j];
          ingredientObj.unit = unitsParam[i][j];
          ingredientsList.push(ingredientObj);
        }
      }
      recipeItem.ingredients = ingredientsList;
      recipeItems.push(recipeItem);
    }
  }
  body.recipe_items = recipeItems;
  return body;
};

export default RecipeBody;
