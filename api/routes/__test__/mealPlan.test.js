import request from 'supertest';
import mongoose from 'mongoose';
import App from '../../app.js';
import MealPlan from '../../model/mealPlan.js';

jest.mock('../../middleware/jwtCheck.js', () => jest.fn((req, res, next) => {
  next();
}));

jest.mock('../../middleware/approvedUser.js', () => jest.fn((req, res, next) => {
  next();
}));

let mealPlan1id;

const addRecipes = async () => {
  const mealPlan1 = await MealPlan.create({
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
  });
  mealPlan1id = mealPlan1._id;

  await MealPlan.create({
    _id: mongoose.Types.ObjectId(),
    date: '2020-01-15',
    startDay: 'Tuesday',
    numDaysPlanned: 0,
    mealPlan: [],
  });
};

describe('route /api/mealplan ', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    await addRecipes();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /api/mealplan', async () => {
    const response = await request(App).get('/api/mealplan');
    const body = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body[0].startDay).toBe('Monday');
    expect(body[1].startDay).toBe('Tuesday');
  });

  it('GET /api/mealplan/:id', async () => {
    const response = await request(App).get(`/api/mealplan/${mealPlan1id}`);
    const body = JSON.parse(response.text);
    expect(body.startDay).toBe('Monday');
  });

  it('POST /api/mealplan', async () => {
    const newMealPlan = {
      _id: mongoose.Types.ObjectId(),
      date: '2020-01-15',
      startDay: 'Wednesday',
      numDaysPlanned: 0,
      mealPlan: [],
    };

    const response = await request(App).post('/api/mealplan').send(newMealPlan);
    const body = JSON.parse(response.text);
    const newMealPlanID = body._id;
    expect(response.status).toBe(200);
    expect(body.startDay).toBe('Wednesday');

    const responseFudge = await request(App).get(`/api/mealplan/${newMealPlanID}`);
    const mealPlanBody = JSON.parse(responseFudge.text);
    expect(responseFudge.status).toBe(200);
    expect(mealPlanBody.startDay).toBe('Wednesday');
  });

  it('PUT /api/mealplan/:id', async () => {
    const mealPlan = await MealPlan.create({
      _id: mongoose.Types.ObjectId(),
      date: '2020-01-15',
      startDay: 'Wednesday',
      numDaysPlanned: 0,
      mealPlan: [],
    });
    const id = mealPlan._id;

    const responseMealPlan = await request(App).get(`/api/mealplan/${id}`);
    const bodyPie = JSON.parse(responseMealPlan.text);
    expect(responseMealPlan.status).toBe(200);
    expect(bodyPie.startDay).toBe('Wednesday');

    const newPie = {
      startDay: 'Thursday',
    };

    const response = await request(App).put(`/api/mealplan/${id}`).send(newPie);
    expect(response.status).toBe(200);

    const newResponse = await request(App).get(`/api/mealplan/${id}`);
    const newBody = JSON.parse(newResponse.text);
    expect(newResponse.status).toBe(200);
    expect(newBody.startDay).toBe('Thursday');
  });

  it('DELETE /api/mealplan/:id', async () => {
    const mealPlan = await MealPlan.create({
      _id: mongoose.Types.ObjectId(),
      date: '2020-01-15',
      startDay: 'Wednesday',
      numDaysPlanned: 0,
      mealPlan: [],
    });
    const id = mealPlan._id;

    let response = await request(App).delete(`/api/mealplan/${id}`);
    expect(response.status).toBe(200);

    response = await request(App).get(`/api/mealplan/${id}`);
    expect(response.status).toBe(404);
  });
});
