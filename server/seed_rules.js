require('dotenv').config();
const mongoose = require('mongoose');
const Rule = require('./models/Rule');

async function seedRules() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Clear existing rules
        await Rule.deleteMany({});
        console.log('🗑️  Cleared existing rules\n');

        // Create default rules
        const defaultRules = [
            { type: 'lab_daily', category: 'lab', period: 'daily', threshold: 50 },
            { type: 'lab_monthly', category: 'lab', period: 'monthly', threshold: 1000 },
            { type: 'water_daily', category: 'water', period: 'daily', threshold: 500 },
            { type: 'water_monthly', category: 'water', period: 'monthly', threshold: 10000 },
            { type: 'electricity_daily', category: 'electricity', period: 'daily', threshold: 100 },
            { type: 'electricity_monthly', category: 'electricity', period: 'monthly', threshold: 2000 }
        ];

        await Rule.insertMany(defaultRules);

        console.log('✅ Default Rules Created:\n');
        console.log('📊 LAB:');
        console.log('   - Daily threshold: 50 kg');
        console.log('   - Monthly threshold: 1000 kg');
        console.log('\n💧 WATER:');
        console.log('   - Daily threshold: 500 liters');
        console.log('   - Monthly threshold: 10000 liters');
        console.log('\n⚡ ELECTRICITY:');
        console.log('   - Daily threshold: 100 kWh');
        console.log('   - Monthly threshold: 2000 kWh');
        console.log('\n✨ You can update these thresholds in the Admin Dashboard!');

        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

seedRules();
