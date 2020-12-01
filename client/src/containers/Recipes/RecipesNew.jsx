import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';

function RecipesNew() {
  const history = useHistory();

  const handleBackClick = () => {
    history.push('/recipes');
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button onClick={handleBackClick} variant="contained" color="primary">Back to Recipes</Button>
        </Grid>
      </Grid>
      <RecipeForm
        edit={false}
        recipeItems={['']}
        ingredients={[['']]}
        sizes={[['']]}
        units={[['']]}
        recipeName=""
      />
    </div>
  );
}

export default RecipesNew;
