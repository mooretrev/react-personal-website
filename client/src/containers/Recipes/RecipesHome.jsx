import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import Recipe from '../../components/Recipe/Recipe.jsx';
import useStyles from '../../styles/Index.jsx';
import GetRecipes from '../../api/Recipes/GetRecipes.js';

function Recipes() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      const _recipes = await GetRecipes(token);
      setRecipes(_recipes);
    };

    fetchData();
  }, []);

  const displayCreateRecipe = () => {
    const { isAuthenticated } = useAuth0();

    const createRecipeButton = (
      <Grid item xs={12}>
        <Link to="/recipes/new" className={classes.link}>
          <Button variant="contained" color="primary">Create New Recipe</Button>
        </Link>
      </Grid>
    );

    return createRecipeButton;
  };

  const renderRecipes = () => {
    if (recipes.length === 0) {
      return <div />;
    }
    const recipeComponents = [];
    for (let i = 0; i < recipes.length; i += 1) {
      const item = (
        <Grid key={i} item xs={12} md={6}>
          <Recipe recipeData={recipes[i]} />
        </Grid>
      );
      recipeComponents.push(item);
    }
    return recipeComponents;
  };

  return (
    <div>
      <Grid container spacing={2}>
        {displayCreateRecipe()}
        {renderRecipes()}
      </Grid>
    </div>
  );
}

export default Recipes;
