const request = require('supertest');
const app = require('../server'); // Adjust the path to your server file

describe('User routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('testuser');
  });

  it('should login a user', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'password' });
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe('testuser');
  });
});

