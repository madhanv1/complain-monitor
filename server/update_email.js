const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

const updateAdmin = async () => {
    try {
        await connectDB();

        const res = await User.updateOne(
            { role: 'admin' },
            { $set: { email: 'vmadhan633@gmail.com' } }
        );

        if (res.modifiedCount > 0) {
            console.log('Admin email updated to vmadhan633@gmail.com');
        } else {
            console.log('Admin not found or email already set.');
        }

    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
};

updateAdmin();
