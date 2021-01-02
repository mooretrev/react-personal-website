import request from 'supertest';
import App from '../../app.js';

describe('GET / ', () => {
  test('Should be successful', async () => {
    const response = await request(App).get('/');
    expect(response.statusCode).toBe(200);
  });
});
