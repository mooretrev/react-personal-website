import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function DayCard(props) {
  const {
    day, recipes, dataRecipes, onRecipeInput, index, onRecipeDeletion,
  } = props;

  const handleRecipeChange = (event, newRecipes) => {
    onRecipeInput(newRecipes, index);
  };

  const handleDeletion = (i) => {
    onRecipeDeletion(index, i);
  };

  const renderRecipes = () => {
    const items = [];
    for (let i = 0; i < recipes.length; i += 1) {
      items.push(
        <Grid key={`recipes_${i}`} container alignItems="center" spacing={2}>
          <Grid item xs={7}>
            <Typography variant="h6">
              {recipes[i]}
            </Typography>
          </Grid>
          <Grid item container justify="flex-end" xs={5}>
            <IconButton onClick={() => { handleDeletion(i); }}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>,
      );
    }
    return items;
  };
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <Typography variant="h2">{day}</Typography>

        <Autocomplete
          id={`recipeInput${index}`}
          options={dataRecipes}
          onInputChange={handleRecipeChange}
          renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        />
        {renderRecipes()}
      </Card>
    </Grid>
  );
}

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};
