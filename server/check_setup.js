require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Rule = require('./models/Rule');

async function checkSetup() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check Admin Users
        console.log('=== ADMIN USERS ===');
        const admins = await User.find({ role: 'admin' });
        if (admins.length === 0) {
            console.log('❌ NO ADMIN USERS FOUND!');
        } else {
            admins.forEach(admin => {
                console.log(`✅ Admin: ${admin.name} (${admin.email})`);
            });
        }

        // Check Rules
        console.log('\n=== COMPLIANCE RULES ===');
        const rules = await Rule.find({});
        if (rules.length === 0) {
            console.log('❌ NO RULES FOUND! You need to set rules in Admin Dashboard.');
        } else {
            rules.forEach(rule => {
                console.log(`✅ ${rule.category.toUpperCase()} - ${rule.period}: Threshold = ${rule.threshold}`);
            });
        }

        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

checkSetup();
