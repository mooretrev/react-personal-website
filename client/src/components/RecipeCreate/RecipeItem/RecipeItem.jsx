import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function RecipeCreateItem(props) {
  const { value } = props;
  const handleRecipeItemChange = (event) => {
    props.onRecipeItemChange(event, props.index);
  };

  return (
    <div>
      <Typography variant="h3">Create Item</Typography>
      <TextField value={value} onChange={handleRecipeItemChange} id="outlined-basic" label="Recipe Item" variant="outlined" />
    </div>
  );
}

RecipeCreateItem.propTypes = {
  value: PropTypes.string.isRequired,
  onRecipeItemChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCreateItem;
