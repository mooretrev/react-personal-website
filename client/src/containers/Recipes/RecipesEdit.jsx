import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import GetRecipe from '../../api/Recipes/GetRecipe.js';
import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';

function RecipesEdit(props) {
  const [recipeData, setRecipeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const _recipes = await GetRecipe(props.match.params.id);
      setRecipeData(_recipes);
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    props.history.push(`/recipes/${recipeData._id}`);
  };

  const getRecipeItems = () => {
    const items = [];
    for (let i = 0; i < recipeData.recipe_items.length; i += 1) {
      items.push(recipeData.recipe_items[i].recipe_item);
    }
    items.push('');
    return items;
  };

  const getIngredients = () => {
    const items = [];
    for (let i = 0; i < recipeData.recipe_items.length; i += 1) {
      const { ingredients } = recipeData.recipe_items[i];
      const ingredientsList = [];
      for (let j = 0; j < ingredients.length; j += 1) {
        ingredientsList.push(ingredients[j].ingredient);
      }
      ingredientsList.push('');
      items.push(ingredientsList);
    }
    items.push(['']);
    return items;
  };

  const getSizes = () => {
    const items = [];
    for (let i = 0; i < recipeData.recipe_items.length; i += 1) {
      const { ingredients } = recipeData.recipe_items[i];
      const ingredientsList = [];
      for (let j = 0; j < ingredients.length; j += 1) {
        ingredientsList.push(ingredients[j].size);
      }
      ingredientsList.push('');
      items.push(ingredientsList);
    }
    items.push(['']);
    return items;
  };

  const getUnits = () => {
    const items = [];
    for (let i = 0; i < recipeData.recipe_items.length; i += 1) {
      const { ingredients } = recipeData.recipe_items[i];
      const ingredientsList = [];
      for (let j = 0; j < ingredients.length; j += 1) {
        ingredientsList.push(ingredients[j].unit);
      }
      ingredientsList.push('');
      items.push(ingredientsList);
    }
    items.push(['']);
    return items;
  };

  const renderRecipeForm = () => {
    if (recipeData.length === 0) {
      return (
        <Typography variant="h2">
          Loading...
        </Typography>
      );
    }
    return (
      <RecipeForm
        id={props.match.params.id}
        edit
        recipeItems={getRecipeItems()}
        ingredients={getIngredients()}
        sizes={getSizes()}
        units={getUnits()}
        recipeName={recipeData.recipe_name}
        history={props.history}
      />
    );
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={handleBackClick} variant="contained" color="primary">Back to Recipes</Button>
        </Grid>
      </Grid>
      {renderRecipeForm()}
    </div>
  );
}

RecipesEdit.propTypes = {
  history: PropTypes.element.isRequired,
  match: PropTypes.element.isRequired,
};

export default RecipesEdit;
