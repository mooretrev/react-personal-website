import React from 'react';
import MealPlanForm from '../../components/MealPlan/MealPlanForm.jsx';

export default function MealPlanNew() {
  return (
    <MealPlanForm numDays={1} offset={0} startDay="Sunday" inputRecipes={[[]]} />
  );
}
