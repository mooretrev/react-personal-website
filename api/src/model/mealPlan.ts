import mongoose, { Schema, Document } from 'mongoose';

export interface SubMealPlanInterface {
  data: string;
  meals: string[];
}

export interface MealPlanModel {
  date: Date;
  startDate: string;
  numDaysPlanned: number;
  mealPlan: SubMealPlanInterface[]
}

export interface MealPlanInterface extends MealPlanModel, Document { }

function mealPlanValidator(this: MealPlanInterface, value: number): boolean {
  return value === this.mealPlan.length;
}

const MealPlanSchema = new Schema<MealPlanInterface>({
  _id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true },
  startDay: { type: String, required: true },
  numDaysPlanned: { type: Number, required: mealPlanValidator },
  mealPlan: [{
    day: String,
    meals: Array,
  }],
});

export default mongoose.model('MealPlan', MealPlanSchema);
