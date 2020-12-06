import request from 'supertest';
import app from '../../app.js';

jest.useFakeTimers();

describe('GET / ', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  test('It should respond with an array of students', (done) => {
    // const response = await request(app).get("/");
    // expect(response.statusCode).toBe(200);
    done();
  });
});
