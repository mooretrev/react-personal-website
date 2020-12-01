import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

function Ingredient(props) {
  // TODO remove these and add input parsing
  const handleIngredientChange = (event) => {
    props.onIngredientChange(event, props.i, props.j);
  };

  const handleSizeChange = (event) => {
    props.onSizeChange(event, props.i, props.j);
  };

  const handleUnitChange = (event) => {
    props.onUnitChange(event, props.i, props.j);
  };

  const {
    i,
    j,
    sizeValue,
    ingredientValue,
    unitValue,
  } = props;

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <TextField value={ingredientValue} id={`ingredient_${i}_${j}`} label="Ingredient" variant="outlined" onChange={handleIngredientChange} />
        </Grid>
        <Grid item xs={4}>
          <TextField value={sizeValue} id={`size_${i}_${j}`} label="Size" variant="outlined" onChange={handleSizeChange} />
        </Grid>
        <Grid item xs={4}>
          <Select
            id={`unit_${i}_${j}`}
            onChange={handleUnitChange}
            value={unitValue}
          >
            <MenuItem value="Cup">Cup</MenuItem>
            <MenuItem value="Tbsp">Tbsp</MenuItem>
            <MenuItem value="Tsp">Tsp</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

Ingredient.propTypes = {
  onIngredientChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onUnitChange: PropTypes.func.isRequired,
  ingredientValue: PropTypes.string.isRequired,
  sizeValue: PropTypes.string.isRequired,
  unitValue: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  j: PropTypes.number.isRequired,

};

export default Ingredient;
