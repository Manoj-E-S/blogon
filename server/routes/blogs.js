const express = require('express');
const fs = require('fs');
const path = require('path');
const { Blog, Category } = require('../database/schema');
const auth = require('../middleware/auth');
const blogUpload = require("../middleware/blogUploadCofig")

const blogRouter = express.Router();


// GET /blogs
blogRouter.get('/', async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const blogs = await Blog.find()
            .populate('authorId', 'username profileImage')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const count = await Blog.countDocuments();
        
        res.json({
            blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /blogs/search?q=example
blogRouter.get('/search', async (req, res) => {
    const query = req.query.q;
    console.log(query);

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
        })
        .populate('authorId', 'username profileImage')
        .exec();

        console.log(blogs);
        res.send(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error fetching blogs' });
    }
});


// GET /blogs/search?q=example
blogRouter.get('/author/:id', auth, async (req, res) => {    
    try {
        if (req.user._id !== req.params.id) {
            return res.status(401).send({ error: "Access Denied"})
        }
        
        const { page = 1, limit = 5 } = req.query;
        const blogs = await Blog.find({ authorId: req.params.id})
            .populate('authorId', 'username profileImage')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // const count = await Blog.countDocuments();
        const count = blogs.length;

        console.log(blogs);
        res.json({
            blogs,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error fetching blogs' });
    }
});


// GET /blogs/:id
blogRouter.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('authorId', 'username profileImage').exec();

        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }

        console.log("Stored in DB: ", blog);

        const coverImageUrl = (blog.coverImage !== "") ? `${req.protocol}://${req.get('host')}/public/uploads/blogImages/${blog.coverImage}`: "";
        blog.coverImage = coverImageUrl

        console.log("Response: ", blog);
        res.send(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// POST /blogs (requires authentication)
blogRouter.post('/', auth, blogUpload.single("coverImage"), async (req, res) => {
    const { title, content, tags, category } = req.body;
    const coverImage = req.file ? req.file.filename : '';

    const blog = new Blog({
        title,
        content,
        category,
        coverImage,
        tags: JSON.parse(tags),
        authorId: req.user._id,
    });
    
    try {
        await blog.save();
        console.log(blog);
        res.status(201).send(blog);
    } catch (error) {
        console.error(error)
        res.status(400).send(error);
    }
});

// PUT /blogs/:id (requires authentication)
blogRouter.put('/:id', auth, blogUpload.single("coverImage"), async (req, res) => {
    try {
        const blog = await Blog.findOne(
            { _id: req.params.id, authorId: req.user._id },
        );

        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }

        blog.title = req.body.title;
        blog.content = req.body.content;
        blog.tags = JSON.parse(req.body.tags);
        blog.category = req.body.category;
        console.log(blog.coverImage);
        if(req.file) {
            fs.unlink(path.join(__dirname, `../public/uploads/blogImages/${blog.coverImage}`), (err) => {
                if (err) {
                  console.error(`Error removing file: ${err}`);
                  return;
                }
            });
            blog.coverImage = req.file.filename;
        }
        await blog.save();

        console.log(blog);
        res.send(blog);
    } catch (error) {
        console.log(error);
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

        console.log("Blog Deleted");
        res.send({ message: 'Blog deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


module.exports = blogRouter;