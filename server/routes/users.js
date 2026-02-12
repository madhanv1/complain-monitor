const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user (Admin only)
// @access  Private/Admin
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied: Admin only' });
    }

    const { name, email, password, role, department } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role,
            department
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json({ msg: 'User created successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
