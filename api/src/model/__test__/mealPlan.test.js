import mongoose from 'mongoose';
import MealPlan from '../mealPlan.js';

describe('Meal Plan Model Validation', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  it('should accept a correct meal plan', async () => {
    const mealPlan = {
      _id: mongoose.Types.ObjectId(),
      date: '2020-01-15',
      startDay: 'Monday',
      numDaysPlanned: 2,
      mealPlan: [{
        day: 'Monday',
        meals: ['Hot Cocoa', 'Pizza'],
      },
      {
        day: 'Tuesday',
        meals: ['Hot Cocoa', 'Pizza'],
      }],
    };
    const newMealPlan = await MealPlan.create(mealPlan);
    expect(newMealPlan.startDay).toBe('Monday');
  });
  it('no date', async () => {
    const mealPlan = {
      _id: mongoose.Types.ObjectId(),
      // date: '2020-01-15',
      startDay: 'Monday',
      numDaysPlanned: 2,
      mealPlan: [{
        day: 'Monday',
        meals: ['Hot Cocoa', 'Pizza'],
      },
      {
        day: 'Tuesday',
        meals: ['Hot Cocoa', 'Pizza'],
      }],
    };

    try {
      await MealPlan.create(mealPlan);
      throw new Error('Shound have gotten here');
    } catch (error) {
      expect(true).toBe(true);
    }
  });
  it('wrong numDaysPlan', async () => {
    const mealPlan = {
      _id: mongoose.Types.ObjectId(),
      date: '2020-01-15',
      startDay: 'Monday',
      numDaysPlanned: 3,
      mealPlan: [{
        day: 'Monday',
        meals: ['Hot Cocoa', 'Pizza'],
      },
      {
        day: 'Tuesday',
        meals: ['Hot Cocoa', 'Pizza'],
      }],
    };

    try {
      await MealPlan.create(mealPlan);
      throw new Error('Shound have gotten here');
    } catch (error) {
      expect(true).toBe(true);
    }
  });
  it('no start day', async () => {
    const mealPlan = {
      _id: mongoose.Types.ObjectId(),
      date: '2020-01-15',
      // startDay: 'Monday',
      numDaysPlanned: 2,
      mealPlan: [{
        day: 'Monday',
        meals: ['Hot Cocoa', 'Pizza'],
      },
      {
        day: 'Tuesday',
        meals: ['Hot Cocoa', 'Pizza'],
      }],
    };

    try {
      await MealPlan.create(mealPlan);
      throw new Error('Shound have gotten here');
    } catch (error) {
      expect(true).toBe(true);
    }
  });
});
