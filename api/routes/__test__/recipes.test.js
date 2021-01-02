import request from 'supertest';
import mongoose from 'mongoose';
import App from '../../app.js';
import Recipe from '../../model/recipe.js';

jest.mock('../../jwtCheck.js', () => jest.fn((req, res, next) => {
  next();
}));

let hotCholocateId;

const addRecipes = async () => {
  const hotCholocate = await Recipe.create({
    _id: mongoose.Types.ObjectId(),
    recipe_name: 'Hot Cholocate',
  });
  hotCholocateId = hotCholocate._id;

  await Recipe.create({
    _id: mongoose.Types.ObjectId(),
    recipe_name: 'Pizza',
  });
};

describe('route /api/recipes ', () => {
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

  it('GET /api/recipes', async () => {
    const response = await request(App).get('/api/recipes');
    const body = JSON.parse(response.text);
    expect(response.status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body[0].recipe_name).toBe('Hot Cholocate');
    expect(body[1].recipe_name).toBe('Pizza');
  });

  it('GET /api/recipes/:id', async () => {
    const response = await request(App).get(`/api/recipes/${hotCholocateId}`);
    const body = JSON.parse(response.text);
    expect(body.recipe_name).toBe('Hot Cholocate');
  });

  it('POST /api/recipes', async () => {
    const fudgeRecipe = {
      recipe_name: 'Fudge',
      recipe_items: [
        {
          recipe_item: 'List',
          ingredients: [
            {
              ingredient: 'Chocolate',
              size: '1',
              unit: 'Cup',
            },
          ],
        },
      ],
    };

    const response = await request(App).post('/api/recipes').send(fudgeRecipe);
    const body = JSON.parse(response.text);
    const fudgeId = body._id;
    expect(response.status).toBe(200);
    expect(body.recipe_name).toBe('Fudge');

    const responseFudge = await request(App).get(`/api/recipes/${fudgeId}`);
    const bodyFudge = JSON.parse(responseFudge.text);
    expect(responseFudge.status).toBe(200);
    expect(bodyFudge.recipe_name).toBe('Fudge');
  });

  it('PUT /api/recipes/:id', async () => {
    const pieRecipe = await Recipe.create({
      _id: mongoose.Types.ObjectId(),
      recipe_name: 'Pie',
    });
    const id = pieRecipe._id;

    const responsePie = await request(App).get(`/api/recipes/${id}`);
    const bodyPie = JSON.parse(responsePie.text);
    expect(responsePie.status).toBe(200);
    expect(bodyPie.recipe_name).toBe('Pie');

    const newPie = {
      recipe_name: 'Apple Pie',
    };

    const response = await request(App).put(`/api/recipes/${id}`).send(newPie);
    expect(response.status).toBe(200);

    const newResponse = await request(App).get(`/api/recipes/${id}`);
    const newBody = JSON.parse(newResponse.text);
    expect(newResponse.status).toBe(200);
    expect(newBody.recipe_name).toBe('Apple Pie');
  });

  it('DELETE /api/recipes/:id', async () => {
    const eggNogRecipes = await Recipe.create({
      _id: mongoose.Types.ObjectId(),
      recipe_name: 'Egg',
    });
    const id = eggNogRecipes._id;

    let response = await request(App).delete(`/api/recipes/${id}`);
    expect(response.status).toBe(200);

    response = await request(App).get(`/api/recipes/${id}`);
    expect(response.status).toBe(404);
  });
});
