export function uniqueItems(items) {
  const retval = [];
  if (items !== undefined && items.length > 0) {
    for (let i = 0; i < items.length; i += 1) {
      if (items[i] !== undefined && items[i].length > 0) {
        for (let j = 0; j < items[i].length; j += 1) {
          if (!retval.includes(items[i][j])) {
            retval.push(items[i][j]);
          }
        }
      }
    }
  }
  return retval;
}

export function make2DArray(mealPlan) {
  const items = [];
  if (mealPlan !== undefined && mealPlan.mealPlan !== undefined && mealPlan.mealPlan.length > 0) {
    for (let i = 0; i < mealPlan.mealPlan.length; i += 1) {
      items.push(mealPlan.mealPlan[i].meals);
    }
  }
  return items;
}

export default function getUniqueItems(items) {
  return uniqueItems(make2DArray(items));
}
