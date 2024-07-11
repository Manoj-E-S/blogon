import { use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import db from '../database/dbSetup.js';
import { User } from '../database/schema.js';
const { expect } = chai;

use(chaiHttp);

describe('User Routes', () => {
  let token;
  let userId;

  before(async () => {
    await User.deleteMany({});

    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    token = res.body.token;
    userId = res.body.user._id;
  });

  it('should fetch user profile', (done) => {
    request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id', userId);
        done();
      });
  });

  it('should update user profile', (done) => {
    request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'updateduser'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('username', 'updateduser');
        done();
      });
  });

  it('should delete user profile', (done) => {
    request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User deleted successfully');
        done();
      });
  });
});