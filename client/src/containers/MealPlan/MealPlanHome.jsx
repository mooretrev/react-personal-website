import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GetRecipeNames from '../../api/Recipes/GetRecipeNames.js';
import DayCard from '../../components/MeelPlan/DayCard.jsx';

const dayOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getCurrentDay(index, offset) {
  return (index + offset) % 7;
}

export default function MealPlanHome() {
  const [numDays, setNumDays] = useState(1);
  const [offset, setOffset] = useState(0);
  const [startDay, setStartDay] = useState('Sunday');
  const [recipes, setRecipes] = useState([]);
  const [inputRecipes, setInputRecipes] = useState([[]]);

  useEffect(() => {
    const fetchData = async () => {
      // const token = await getAccessTokenSilently();
      const token = undefined;
      const _recipes = await GetRecipeNames(token);
      setRecipes(_recipes);
    };

    fetchData();
  }, []);

  const handleRecipeInput = (newRecipe, index) => {
    if (recipes.includes(newRecipe)) {
      const indexInt = parseInt(index, 10);
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

  const handleFinishMealPlan = () => {
    // TODO api call
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
      const day = dayOfTheWeek[getCurrentDay(i, offset)];
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

  const render = () => {
    if (recipes !== undefined && recipes.length > 0) {
      return (
        <Grid container spacing={2}>
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
        </Grid>
      );
    }
    return <Typography variant="h1">Loading</Typography>;
  };

  return (
    <div>
      {render()}
    </div>
  );
}
