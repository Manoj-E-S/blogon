const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { User } = require('../database/schema');
const { expect } = chai;

chai.use(chaiHttp);

describe('Auth Routes', () => {
  before(async () => {
    await User.deleteMany({});
  });

  let token;

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/register')
      .field('username', 'testuser')
      .field('email', 'testuser@example.com')
      .field('password', 'password123')
      .attach('profileImage', 'path/to/test/image.jpg')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('should not register a user with existing email', (done) => {
    chai.request(app)
      .post('/register')
      .send({
        username: 'testuser2',
        email: 'testuser@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Email already in use');
        done();
      });
  });

  it('should login an existing user', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('should not login with incorrect email', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'wrongemail@example.com',
        password: 'password123'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Invalid email or password');
        done();
      });
  });

  it('should not login with incorrect password', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error', 'Invalid email or password');
        done();
      });
  });

  it('should logout a logged-in user', (done) => {
    chai.request(app)
      .get('/logout')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Logged out successfully');
        done();
      });
  });
});