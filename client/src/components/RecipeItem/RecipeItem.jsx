import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  text: {
    padding: '4px',
    // margin: '4px'
  },
  unit: {
    textAlign: 'right',
    paddingRight: '7%',
  },
}));

function RecipeItem(props) {
  const classes = useStyles();

  const createIngredients = () => {
    const { ingredients } = props.recipeItem;
    const items = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      items.push(
        <Grid container key={i}>
          <Grid item xs={8}>
            <Typography className={classes.text} variant="h6">
              {ingredients[i].ingredient}
              {' '}
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography className={classes.unit} variant="h6">
              {ingredients[i].size}
              {' '}
              {ingredients[i].unit}
              {' '}
            </Typography>
          </Grid>
        </Grid>,

      );
    }
    return items;
  };

  const { recipeItem } = props;

  return (
    <div>
      <Typography className={classes.text} variant="h4">
        {' '}
        {recipeItem.recipe_item}
      </Typography>
      {createIngredients()}
    </div>
  );
}

RecipeItem.propTypes = {
  recipeItem: PropTypes.element.isRequired,
};

export default RecipeItem;
