const express = require('express');
const blogRouter = express.Router();
const { Blog, Category } = require('../database/schema');
const auth = require('../middleware/auth');

// GET /blogs
blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /blogs/:id
blogRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /blogs/search?q=example
blogRouter.get('/search', async (req, res) => {
    const { query } = req.query;

    try {
        const regex = new RegExp(query, 'i');
        const categories = await Category.find({ name: regex });

        const categoryIds = categories.map(category => category._id);

        const blogs = await Blog.find({
            $or: [
                { title: regex },
                { content: regex },
                { tags: regex },
                { category: { $in: categoryIds } }
            ]
        });

        res.send(blogs);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching blogs' });
    }
});

// POST /blogs (requires authentication)
blogRouter.post('/', auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        authorId: req.user._id
    });

    try {
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT /blogs/:id (requires authentication)
blogRouter.put('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, authorId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }

        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE /blogs/:id (requires authentication)
blogRouter.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, authorId: req.user._id });

        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }

        res.send({ message: 'Blog deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = blogRouter;