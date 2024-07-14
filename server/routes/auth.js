const express = require('express');
const authRouter = express.Router();
const { User } = require('../database/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const profileUpload = require('../middleware/profileUploadCofig');

require('dotenv').config();


authRouter.post('/register', profileUpload.single('profileImage'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const bio = req.body.bio ?  req.body.bio : "";
        const profileImage = req.file ? req.file.filename : '';

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        const user = new User({ username, email, password, profileImage, bio });
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).send({ token });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const profileImageUrl = (user.profileImage !== "") ? `${req.protocol}://${req.get('host')}/public/uploads/profileImages/${user.profileImage}`: "";

        res.send({ token, profileImageUrl, username: user.username, userId: user._id});
    } catch (error) {
        res.status(500).send(error);
    }
});


authRouter.get('/logout', (req, res) => {
    res.status(201).send({ message: 'Logged out successfully' });
});

module.exports = authRouter;
