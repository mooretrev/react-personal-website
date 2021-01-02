import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
// import { useAuth0 } from '@auth0/auth0-react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Recipe from '../../components/Recipe/Recipe.jsx';
import useStyles from '../../styles/Index.jsx';
import GetRecipes from '../../api/Recipes/GetRecipes.js';
import GetRecipeNames from '../../api/Recipes/GetRecipeNames.js';

function Recipes() {
  const history = useHistory();
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [recipeNames, setRecipeNames] = useState([]);
  // const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      // const token = await getAccessTokenSilenly();
      const token = undefined;
      const _recipes = await GetRecipes(token);
      const recipeNamesCopy = await GetRecipeNames(token);
      setRecipes(_recipes);
      setRecipeNames(recipeNamesCopy);
    };

    fetchData();
  }, []);

  const handleRecipeSearch = (event, newRecipe) => {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].recipe_name === newRecipe) {
        history.push(`/recipes/${recipes[i]._id}`);
      }
    }
  };

  const renderSearchBar = () => (
    <Grid item xs={12}>
      <Card>
        <Autocomplete
          className={classes.searchBar}
          options={recipeNames}
          onInputChange={handleRecipeSearch}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          renderInput={(params) => <TextField {...params} label="Search Recipes" variant="outlined" />}
        />
      </Card>
    </Grid>
  );

  const displayCreateRecipe = () => {
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
        {renderSearchBar()}
        {displayCreateRecipe()}
        {renderRecipes()}
      </Grid>
    </div>
  );
}

export default Recipes;
