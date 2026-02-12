const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('./models/User');
const connectDB = require('./config/db');

const seed = async () => {
    try {
        await connectDB();

        let admin = await User.findOne({ email: 'admin@test.com' });
        if (admin) {
            console.log('Admin already exists');
            process.exit();
        }

        admin = new User({
            name: 'System Admin',
            email: 'admin@test.com',
            password: 'admin', // Simple password for testing
            role: 'admin',
            department: 'IT'
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);

        await admin.save();
        console.log('Admin created successfully');
        console.log('Email: admin@test.com');
        console.log('Password: admin');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

seed();
