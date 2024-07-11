import { use, request } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import db from '../database/dbSetup.js';
import { Blog, User } from '../database/schema.js';
const { expect } = chai;

use(chaiHttp);

describe('Blog Routes', () => {
    let token;
    let userId;

    before(async () => {
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
        userId = res.body.user._id;
    });

    it('should create a new blog', (done) => {
        request(app)
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
        request(app)
        .get('/blogs')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('should fetch a blog by ID', (done) => {
        request(app)
        .get('/blogs')
        .end((err, res) => {
            const blogId = res.body[0]._id;
            request(app)
            .get(`/blogs/${blogId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('_id', blogId);
                done();
            });
        });
    });

    it('should return blog posts matching the query', (done) => {
        request(app)
        .get('/blogs/search?q=technology')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            res.body.forEach(blog => {
                expect(blog.title).to.include('technology').or.to.include('Technology');
            });
            done();
        });
    });

    it('should return an empty array if no posts match the query', (done) => {
        request(app)
        .get('/blogs/search?q=nonexistentquery')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').that.is.empty;
            done();
        });
    });
});