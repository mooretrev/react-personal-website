import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GetRecipeNames from '../../api/Recipes/GetRecipeNames.js';
import DayCard from './DayCard.jsx';
import dayOfTheWeek from '../../constants/daysOfTheWeek.js';
import getCurrentDayIndex from '../../api/MealPlan/getCurrentDayIndex.js';
import CreateMealPlan from '../../api/MealPlan/CreateMealPlan.js';
import EditMealPlan from '../../api/MealPlan/EditMealPlan.js';

export default function MealPlanForm(props) {
  const [numDays, setNumDays] = useState(props.numDays);
  const [offset, setOffset] = useState(props.offset);
  const [startDay, setStartDay] = useState(props.startDay);
  const [recipes, setRecipes] = useState([]);
  const [inputRecipes, setInputRecipes] = useState(props.inputRecipes);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [failedSubmission, setFailedSubmission] = useState(false);

  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      // const token = await getAccessTokenSilently();
      const token = undefined;
      const _recipes = await GetRecipeNames(token);
      setRecipes(_recipes);
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    history.push('/mealplan');
  };

  const handleRecipeInput = (newRecipe, index) => {
    if (recipes.includes(newRecipe)) {
      const copyInputRecipes = JSON.parse(JSON.stringify(inputRecipes));
      copyInputRecipes[index].push(newRecipe);
      setInputRecipes(copyInputRecipes);

      if (index === numDays - 1) {
        setNumDays(numDays + 1);
        copyInputRecipes.push([]);
        setInputRecipes(copyInputRecipes);
      }
    }
  };

  const handleStartDayChange = (event) => {
    setOffset(dayOfTheWeek.indexOf(event.target.value));
    setStartDay(event.target.value);
  };

  const handleRecipeDeletion = (idDayCard, indexRecipes) => {
    const copyInputRecipes = JSON.parse(JSON.stringify(inputRecipes));
    const array = copyInputRecipes[idDayCard];
    array.splice(indexRecipes, 1);
    setInputRecipes(copyInputRecipes);
  };

  const handleFinishMealPlan = async () => {
    const today = new Date();
    const strToday = today.toISOString().substring(0, 10);
    const token = await getAccessTokenSilently();
    let res;
    if (props.edit) {
      res = await EditMealPlan(token, props.id, inputRecipes, startDay, strToday);
      history.push(`/mealplan/${props.id}`);
      return;
    }
    res = await CreateMealPlan(token, inputRecipes, startDay, strToday);

    if (res !== -1) {
      setSuccessfulSubmission(true);
    } else {
      setFailedSubmission(true);
    }
  };

  const renderSelectDays = () => {
    const items = [];

    for (let i = 0; i < dayOfTheWeek.length; i += 1) {
      items.push(
        <MenuItem
          key={i}
          value={dayOfTheWeek[i]}
        >
          {dayOfTheWeek[i]}
        </MenuItem>,
      );
    }
    return items;
  };

  const renderDayCards = () => {
    const items = [];
    for (let i = 0; i < numDays; i += 1) {
      const day = dayOfTheWeek[getCurrentDayIndex(i, offset)];
      const id = `${day}${i}`;
      items.push(
        <DayCard
          key={id}
          day={day}
          index={i}
          onRecipeInput={handleRecipeInput}
          onRecipeDeletion={handleRecipeDeletion}
          dataRecipes={recipes}
          recipes={inputRecipes[i]}
        />,
      );
    }

    return items;
  };

  const renderSuccessMessage = () => {
    if (successfulSubmission) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5">
            Meal Plan Successfully Submitted
          </Typography>
        </Grid>
      );
    } if (failedSubmission) {
      return (
        <Grid item xs={12}>
          <Typography variant="h5">
            Failure in Meal Plan Submission
          </Typography>
        </Grid>
      );
    }
    return <div />;
  };

  const render = () => {
    if (recipes !== undefined && recipes.length > 0) {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button onClick={handleBackClick} variant="contained" color="primary">Back to Meal Plans</Button>
          </Grid>
          <Grid item xs={12}>
            <Select
              onChange={handleStartDayChange}
              value={startDay}
            >
              {renderSelectDays()}
            </Select>
          </Grid>
          {renderDayCards()}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleFinishMealPlan}>Finish Meal Plan</Button>
          </Grid>
          {renderSuccessMessage()}
        </Grid>
      );
    }
    return <Typography variant="h1">Loading</Typography>;
  };

  return render();
}

// MealPlanForm.propTypes = {

// }
