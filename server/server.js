const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors")
const dotenv = require('dotenv');
const db = require('./database/dbSetup');

dotenv.config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');


const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);


const HOST = process.env.DEV_HOST || "localhost";
const PORT = process.env.DEV_PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, (error) =>{
        if(!error)
            console.log(`Server running at http://${HOST}:${PORT}`);
        else 
            console.log("Error occurred, server can't start", error);
        }
    );
}

// [For Testing]
module.exports = app;