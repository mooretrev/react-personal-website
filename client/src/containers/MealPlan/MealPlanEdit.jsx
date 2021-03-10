import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MealPlanForm from '../../components/MealPlan/MealPlanForm.jsx';
import GetMealPlan from '../../api/MealPlan/GetMealPlan.js';
import daysOfTheWeek from '../../constants/daysOfTheWeek.js';

export default function MealPlanEdit() {
  const [mealPlan, setMealPlan] = useState(undefined);

  const match = useRouteMatch();

  useEffect(() => {
    const fetchData = async () => {
      const mealPlanCopy = await GetMealPlan(match.params.id);
      setMealPlan(mealPlanCopy);
    };

    fetchData();
  }, []);

  const getInputRecipes = (mealPlanCopy) => {
    const retval = [];

    mealPlanCopy.mealPlan.map((plan) => {
      retval.push(plan.meals);
      return 0;
    });

    return retval;
  };

  const getOffset = (startDay) => daysOfTheWeek.indexOf(startDay);

  const renderMealPlanForm = () => {
    if (mealPlan === undefined) {
      return (
        <Typography variant="h2">
          Loading...
        </Typography>
      );
    }
    return (
      <MealPlanForm
        edit
        id={mealPlan._id}
        numDays={mealPlan.numDaysPlanned}
        offset={getOffset(mealPlan.startDay)}
        startDay={mealPlan.startDay}
        inputRecipes={getInputRecipes(mealPlan)}
      />

    );
  };

  return renderMealPlanForm();
}
