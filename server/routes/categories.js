const express = require('express');
const categoryRouter = express.Router();
const { Category, Blog } = require('../database/schema');

// GET /categories [List of all categories]
categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching categories' });
    }
});

// GET /categories/:id/posts [All blogs for a specific category]
categoryRouter.get('/:id/posts', async (req, res) => {
    try {
        const blogs = await Blog.find({ category: req.params.id });
        res.send(blogs);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching posts for category' });
    }
});

module.exports = categoryRouter;