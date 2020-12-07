import request from 'supertest';
import App from '../../app.js';

describe('GET / ', () => {
  test('It should respond with an array of students', async () => {
    const response = await request(App).get('/');
    expect(response.statusCode).toBe(200);
  });
});
