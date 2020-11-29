import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RecipeForm from '../../components/RecipeForm/RecipeForm.jsx';

function RecipesNew(props) {
  const handleBackClick = () => {
    props.history.push('/recipes');
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

RecipesNew.propTypes = {
  history: PropTypes.element.isRequired,
};

export default RecipesNew;
