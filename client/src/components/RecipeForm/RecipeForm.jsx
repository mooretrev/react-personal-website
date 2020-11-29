import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import RecipeItem from '../RecipeCreate/RecipeItem/RecipeItem.jsx';
import Ingredient from '../RecipeCreate/Ingredient/Ingredient.jsx';
import CreateRecipe from '../../api/Recipes/CreateRecipe.js';
import EditRecipe from '../../api/Recipes/EditRecipe.js';

function RecipeForm(props) {
  /* STATES */
  const {
    recipeItems,
    ingredients,
    sizes,
    units,
    recipeName,
  } = props;
  const { getAccessTokenSilently } = useAuth0();

  const [recipeItemsState, setRecipeItems] = useState(recipeItems);
  const [ingredientsState, setIngredients] = useState(ingredients);
  const [sizesState, setSizes] = useState(sizes);
  const [unitsState, setUnits] = useState(units);
  const [recipeNameState, setRecipeName] = useState(recipeName);
  const [requestSuccessState, setRequestSuccess] = useState('');

  const resetToIntialState = () => {
    setRecipeName('');
    setRecipeItems(['']);
    setIngredients([['']]);
    setSizes([['']]);
    setUnits([['']]);
  };

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleRecipeItemChange = async (event, i) => {
    const iNum = parseInt(i, 10);
    const newRecipeItems = recipeItemsState.slice();
    newRecipeItems[iNum] = event.target.value;
    setRecipeItems(newRecipeItems);

    if ((iNum + 1) === recipeItemsState.length) {
      newRecipeItems.push('');
      setRecipeItems(newRecipeItems);

      const newIngredients = ingredientsState.slice();
      newIngredients.push(['']);
      setIngredients(newIngredients);

      const newSizes = sizesState.slice();
      newSizes.push(['']);
      setSizes(newSizes);

      const newUnits = unitsState.slice();
      newUnits.push(['']);
      setUnits(newUnits);
    }
  };

  const handleIngredientChange = (event, i, j) => {
    const iNum = parseInt(i, 10);
    const jNum = parseInt(j, 10);

    const newIngredientsT = ingredientsState.slice();
    newIngredientsT[iNum][jNum] = event.target.value;
    setIngredients(newIngredientsT);

    if (jNum + 1 === ingredientsState[iNum].length) {
      const newIngredients = ingredientsState.slice();
      newIngredients[iNum].push('');
      setIngredients(newIngredients);

      const newSizes = sizesState.slice();
      newSizes[iNum].push('');
      setSizes(newSizes);

      const newUnits = unitsState.slice();
      newUnits[iNum].push('');
      setUnits(newUnits);
    }
  };

  const handleSizeChange = (event, i, j) => {
    const iNum = parseInt(i, 10);
    const jNum = parseInt(j, 10);
    const newSizes = sizesState.slice();
    newSizes[iNum][jNum] = event.target.value;
    setSizes(newSizes);
  };

  const handleUnitChange = (event, i, j) => {
    const iNum = parseInt(i, 10);
    const jNum = parseInt(j, 10);
    const newUnits = unitsState.slice();
    newUnits[iNum][jNum] = event.target.value;
    setUnits(newUnits);
  };

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    if (props.edit) {
      EditRecipe(
        token,
        props.id,
        recipeNameState,
        recipeItemsState,
        ingredientsState,
        sizesState,
        unitsState,
      );
      props.history.push(`/recipes/${props.id}`);
    } else {
      CreateRecipe(token, recipeNameState, recipeItemsState, ingredientsState, sizesState, unitsState);
      setRequestSuccess(true);
      resetToIntialState();
    }
  };

  const createCreationMessage = () => {
    if (requestSuccessState === true) {
      return (
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Recipe created successfully.
          </Typography>
        </Grid>
      );
    }
    return <div />;
  };

  const createIngredient = (i, j) => (
    <Ingredient
      key={`ingredient${j}`}
      onIngredientChange={handleIngredientChange}
      onSizeChange={handleSizeChange}
      onUnitChange={handleUnitChange}
      i={i}
      j={j}
      unitValue={unitsState[i][j]}
      sizeValue={sizesState[i][j]}
      ingredientValue={ingredientsState[i][j]}
    />
  );

  const createIngredients = (i) => {
    const items = [];
    for (let j = 0; ingredientsState[i] !== undefined && j < ingredientsState[i].length; j += 1) {
      items.push(createIngredient(i, j));
    }
    return items;
  };

  const createRecipeItem = (i) => (
    <div>
      <Card>
        <RecipeItem
          value={recipeItemsState[i]}
          index={i}
          onRecipeItemChange={handleRecipeItemChange}
        />
        {createIngredients(i)}
      </Card>
    </div>
  );

  const createElements = () => {
    const items = [];
    for (let i = 0; i < recipeItemsState.length; i += 1) {
      const item = createRecipeItem(i);
      const gridItem = (
        <Grid item xs={12}>
          {item}
        </Grid>
      );
      items.push(gridItem);
    }
    return items;
  };

  return (
    <div>
      <Grid key="form" container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <Typography variant="h2">Create Recipe</Typography>
            <TextField value={recipeNameState} onChange={handleRecipeNameChange} id="outlined-basic" label="Recipe Name" variant="outlined" />
          </Card>
        </Grid>
        {createElements()}
        {createCreationMessage()}
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
}

RecipeForm.propTypes = {
  recipeItems: PropTypes.element.isRequired,
  ingredients: PropTypes.element.isRequired,
  sizes: PropTypes.element.isRequired,
  units: PropTypes.element.isRequired,
  recipeName: PropTypes.element.isRequired,
  edit: PropTypes.element.isRequired,
  id: PropTypes.element.isRequired,
  history: PropTypes.element.isRequired,

};

export default RecipeForm;
