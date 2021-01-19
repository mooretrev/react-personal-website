import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import GetMealPlan from '../../api/MealPlan/GetMealPlan.js';
import DeleteMealPlan from '../../api/MealPlan/DeleteMealPlan.js';
import getUniqueItems from '../../api/MealPlan/getUniqueItems.js';
import ShoppingList from '../../components/MealPlan/ShoppingList.jsx';
import GetIngredients from '../../api/MealPlan/GetIngredients.js';
import GetRecipes from '../../api/Recipes/GetRecipes.js';

export default function MealPlanId() {
  const [mealPlan, setMealPlan] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const match = useRouteMatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = undefined;
      const mealPlanCopy = await GetMealPlan(token, match.params.id);
      setMealPlan(mealPlanCopy);
      const ingredientsCopy = await GetIngredients(token, getUniqueItems(mealPlanCopy));
      setIngredients(ingredientsCopy);
      const recipesCopy = await GetRecipes(token);
      setRecipes(recipesCopy);
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    history.push('/mealplan');
  };

  const handleCardClick = (event, recipeName) => {
    for (let i = 0; i < recipes.length; i += 1) {
      if (recipes[i].recipe_name === recipeName) {
        const id = recipes[i]._id;
        history.push(`/recipes/${id}`);
        return 0;
      }
    }
    return 0;
  };

  const handleEdit = () => {
    const url = `/mealplan/${mealPlan._id}/edit`;
    history.push(url);
  };

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    DeleteMealPlan(token, mealPlan._id);
    // TODO check for success
    history.push('/mealplan');
  };

  const renderRecipes = (recipeNames) => {
    const items = [];
    for (let i = 0; i < recipeNames.length; i += 1) {
      items.push(
        <CardActionArea key={`recipes${i}`} onClick={(event) => handleCardClick(event, recipeNames[i])}>
          <Typography variant="h6">
            {recipeNames[i]}
          </Typography>
        </CardActionArea>,
      );
    }
    return items;
  };

  const renderDayCard = (mealPlanDay, key) => (
    <Grid key={key} item xs={12} md={6}>
      <Card>
        <Typography variant="h3">
          {mealPlanDay.day}
        </Typography>
        {renderRecipes(mealPlanDay.meals)}
      </Card>
    </Grid>
  );

  const renderDayCards = () => {
    if (mealPlan !== undefined && mealPlan !== {}) {
      const items = [];
      for (let i = 0; i < mealPlan.numDaysPlanned; i += 1) {
        items.push(renderDayCard(mealPlan.mealPlan[i], `mealPlan${i}`));
      }
      return items;
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Button onClick={handleBackClick} variant="contained" color="primary">Back to Meal Plans</Button>
      </Grid>
      {renderDayCards()}
      {editDeleteButtons}
      <ShoppingList ingredients={ingredients} />
    </Grid>
  );
}
