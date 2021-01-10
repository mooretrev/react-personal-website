import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import RecipeItem from '../../components/RecipeItem/RecipeItem.jsx';
import GetRecipe from '../../api/Recipes/GetRecipe.js';
import DeleteRecipe from '../../api/Recipes/DeleteRecipe.js';

function RecipesId() {
  const history = useHistory();
  const match = useRouteMatch();
  const [recipeData, setRecipeData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const handleBackClick = () => {
    history.push('/recipes');
  };

  const handleEdit = () => {
    const url = `/recipes/${recipeData._id}/edit`;
    history.push(url);
  };

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    DeleteRecipe(token, recipeData._id);
    // TODO check for success
    history.push('/recipes');
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      const _recipes = await GetRecipe(token, match.params.id);
      setRecipeData(_recipes);
    };

    fetchData();
  }, []);

  const createRecipeItems = () => {
    if (recipeData !== []) {
      const recipeItems = recipeData.recipe_items;
      if (recipeItems !== undefined) {
        const items = [];
        for (let i = 0; i < recipeItems.length; i += 1) {
          items.push(
            <Grid key={recipeItems[i]} item xs={12} md={6}>
              <Card>
                <RecipeItem key={i} recipeItem={recipeItems[i]} />
              </Card>
            </Grid>,
          );
        }
        return items;
      }
    }
    return <div />;
  };

  const editDeleteButtons = (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item><Button onClick={handleEdit} variant="contained" color="primary">Edit</Button></Grid>
        <Grid item><Button onClick={handleDelete} variant="contained" color="primary">Delete</Button></Grid>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <Grid spacing={2} container>
        <Grid item xs={12}>
          <Button onClick={handleBackClick} variant="contained" color="primary">Back to Recipes</Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Typography variant="h2">{recipeData.recipe_name}</Typography>
          </Card>
        </Grid>
        {createRecipeItems()}
        {editDeleteButtons}
      </Grid>
    </div>

  );
}

export default RecipesId;
