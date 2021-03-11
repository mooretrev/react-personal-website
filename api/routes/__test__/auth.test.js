import request from 'supertest';
import mongoose from 'mongoose';
import App from '../../app.js';
import User from '../../model/user.js';

describe('POST /api/signup', () => {
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

  test('Should be successful', async () => {
    const response = await request(App).post('/api/auth/signup')
      .send({
        username: 'test',
        password: '1234',
        email: 'test@test.com',
      });

    expect(response.statusCode).toBe(200);
    const user = await User.findOne({ username: 'test' });
    expect(user.username).toBe('test');

    expect(user.email).toBe('test@test.com');
  });
});
