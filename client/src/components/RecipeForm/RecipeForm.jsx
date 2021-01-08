import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeItem from '../RecipeCreate/RecipeItem/RecipeItem.jsx';
import Ingredient from '../RecipeCreate/Ingredient/Ingredient.jsx';
import CreateRecipe from '../../api/Recipes/CreateRecipe.js';
import EditRecipe from '../../api/Recipes/EditRecipe.js';
import useStyles from '../../styles/Index.jsx';

function RecipeForm(props) {
  const history = useHistory();
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

  const classes = useStyles();

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

  const handleDuplicate = (i) => {
    const recipeItemCopy = JSON.parse(JSON.stringify(recipeItemsState));
    const ingredientCopy = JSON.parse(JSON.stringify(ingredientsState));
    const sizeCopy = JSON.parse(JSON.stringify(sizesState));
    const unitCopy = JSON.parse(JSON.stringify(unitsState));
    const length = recipeItemsState.length - 1;

    recipeItemCopy.push(recipeItemCopy[i]);
    ingredientCopy.push(ingredientCopy[i]);
    sizeCopy.push(sizeCopy[i]);
    unitCopy.push(unitCopy[i]);

    if (recipeItemsState[length] === '') {
      recipeItemCopy.splice(length, 1);
      ingredientCopy.splice(length, 1);
      sizeCopy.splice(length, 1);
      unitCopy.splice(length, 1);

      recipeItemCopy.push('');
      ingredientCopy.push(['']);
      sizeCopy.push(['']);
      unitCopy.push(['']);
    }

    setRecipeItems(recipeItemCopy);
    setIngredients(ingredientCopy);
    setSizes(sizeCopy);
    setUnits(unitCopy);
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
      history.push(`/recipes/${props.id}`);
    } else {
      CreateRecipe(
        token,
        recipeNameState,
        recipeItemsState,
        ingredientsState,
        sizesState,
        unitsState,
      );
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
      <Card className={classes.cardPadding}>
        <RecipeItem
          value={recipeItemsState[i]}
          index={i}
          onRecipeItemChange={handleRecipeItemChange}
        />
        {createIngredients(i)}
        <Button id="dupicate_btn" onClick={() => handleDuplicate(i)} variant="contained" color="primary">Duplicate</Button>
      </Card>
    </div>
  );

  const createElements = () => {
    const items = [];
    for (let i = 0; i < recipeItemsState.length; i += 1) {
      const item = createRecipeItem(i);
      const gridItem = (
        <Grid key={`recipeItem${i}`} item xs={12}>
          {item}
        </Grid>
      );
      items.push(gridItem);
    }
    return items;
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card className={classes.cardPadding}>
            <Typography variant="h2">Create Recipe</Typography>
            <TextField id="recipe_name" value={recipeNameState} onChange={handleRecipeNameChange} label="Recipe Name" variant="outlined" />
          </Card>
        </Grid>
        {createElements()}
        {createCreationMessage()}
        <Grid item xs={12}>
          <Button id="submit_btn" onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
}

RecipeForm.propTypes = {
  recipeItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  units: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  recipeName: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeForm;
