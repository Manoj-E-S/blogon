const express = require('express');
const authRouter = express.Router();
const { User } = require('../database/schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const upload = require('../middleware/uploadCofig');
const auth = require('../middleware/auth');

require('dotenv').config();


authRouter.post('/register', upload.single('profileImage'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const profileImage = req.file ? req.file.path : '';

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        const user = new User({ username, email, password, profileImage });
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ token });
    } catch (error) {
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

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});


authRouter.get('/logout', auth, (req, res) => {
    res.send({ message: 'Logged out successfully' });
});

module.exports = authRouter;
