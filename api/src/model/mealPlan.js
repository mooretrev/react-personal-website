import mongoose from 'mongoose';

const { Schema } = mongoose;

function mealPlanValidator(value) {
  return value === this.mealPlan.length;
}

const mealPlanSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true },
  startDay: { type: String, required: true },
  numDaysPlanned: { type: Number, required: mealPlanValidator },
  mealPlan: [{
    day: String,
    meals: Array,
  }],
});

const Recipe = mongoose.model('MealPlan', mealPlanSchema);

export default Recipe;
