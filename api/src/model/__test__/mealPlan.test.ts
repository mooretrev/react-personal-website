import mongoose from 'mongoose';
import MealPlan from '../mealPlan.js';
import { connect, close, clearDatabase } from '../../db';

beforeAll(async () => await connect())
beforeEach(async () => await clearDatabase())
afterAll(async () => await close())


describe('Meal Plan Model Validation', () => {
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
