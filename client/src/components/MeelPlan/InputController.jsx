import React from 'react';
import Card from '@material-ui/core/Card';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

export default function InputController(props) {
  const { handleRecipeChange, recipes } = props;

  return (
    <Card>
      <Typography variant="h1">
        Controller
      </Typography>
      <Autocomplete
        id="recipeInput"
        options={recipes}
        onInputChange={handleRecipeChange}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
    </Card>
  );
}

InputController.propTypes = {
  handleRecipeChange: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
