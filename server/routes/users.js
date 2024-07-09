const express = require('express');
const userRouter = express.Router();
const { User } = require('../database/schema');
const auth = require('../middleware/auth');


// GET users/:id [User Profile]
userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});


// PUT /users/:id [Update Self Profile] (requires authentication)
userRouter.put('/:id', auth, async (req, res) => {
    try {
        if (req.params.id !== req.user._id) {
            return res.status(403).send({ error: 'You can only update your own profile' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['username', 'email', 'password', 'profileImage'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


// DELETE /users/:id - [Delete Self Profile] (requires authentication)
userRouter.delete('/:id', auth, async (req, res) => {
    try {
        if (req.params.id !== req.user._id) {
            return res.status(403).send({ error: 'You can only delete your own profile' });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = userRouter;