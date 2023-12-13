const request = require('supertest');
const app = require('../app'); // Replace '../app' with the path to your Express app

describe('POST /', () => {
  it('should login successfully with valid credentials', async () => {
    const validUser = {
      email: 'testUser@gmail.com',
      psw: '0000' 
    };

    const response = await request(app)
      .post('/auth/login') 
      .send(validUser);

    expect(response.status).toBe(200);
    expect(response.text).toContain('Success!');
  });
});

