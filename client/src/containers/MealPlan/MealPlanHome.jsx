import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useStyles from '../../styles/Index.jsx';
import MealPlanCard from '../../components/MealPlan/MealPlanCard.jsx';
import GetMealsPlans from '../../api/MealPlan/GetMealPlans.js';

export default function MealPlanHome() {
  const classes = useStyles();

  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mealPlansCopy = await GetMealsPlans();
      setMealPlans(mealPlansCopy);
    };

    fetchData();
  }, []);

  const renderCreateMealPlanButton = () => (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Link to="/mealplan/new" className={classes.link}>
            <Button variant="contained" color="primary">Create Meal Plan</Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderMealPlans = () => {
    const items = [];
    if (mealPlans !== undefined && mealPlans.length > 0) {
      for (let i = 0; i < mealPlans.length; i += 1) {
        items.push(
          <Grid key={`MealPlanCard${i}`} item xs={12} md={6}>
            <MealPlanCard
              key={i}
              mealPlanObj={mealPlans[i]}
            />
          </Grid>,
        );
      }
    }
    return items;
  };
  return (
    <Grid container spacing={2}>
      {renderCreateMealPlanButton()}
      {renderMealPlans()}
    </Grid>
  );
}
