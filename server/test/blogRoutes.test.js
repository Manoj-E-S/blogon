const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const { Blog, User } = require('../database/schema');
const { expect } = chai;

chai.use(chaiHttp);

describe('Blog Routes', () => {
  let token;
  let userId;

  before(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const res = await chai.request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    token = res.body.token;
    userId = res.body.user._id;
  });

  it('should create a new blog', (done) => {
    chai.request(app)
      .post('/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        content: 'This is a test blog post.',
        authorId: userId
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('title', 'Test Blog');
        done();
      });
  });

  it('should fetch all blogs', (done) => {
    chai.request(app)
      .get('/blogs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should fetch a blog by ID', (done) => {
    chai.request(app)
      .get('/blogs')
      .end((err, res) => {
        const blogId = res.body[0]._id;
        chai.request(app)
          .get(`/blogs/${blogId}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id', blogId);
            done();
          });
      });
  });
});