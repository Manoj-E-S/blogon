import { use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import db from '../database/dbSetup.js';
import { Category, Blog, User } from '../database/schema.js';
const { expect } = chai;

use(chaiHttp);

describe('Category Routes', () => {
  let token;
  let categoryId;

  before(async () => {
    await Category.deleteMany({});
    await Blog.deleteMany({});
    await User.deleteMany({});

    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    token = res.body.token;
  });

  it('should create a new category', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Category',
        description: 'This is a test category.'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('name', 'Test Category');
        categoryId = res.body._id;
        done();
      });
  });

  it('should fetch all categories', (done) => {
    request(app)
      .get('/categories')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should fetch all blogs for a specific category', (done) => {
    request(app)
      .post('/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        content: 'This is a test blog post.',
        authorId: res.body.user._id,
        category: categoryId
      })
      .end((err, res) => {
        request(app)
          .get(`/categories/${categoryId}/posts`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });
  });
});