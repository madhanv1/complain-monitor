const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ['water', 'electricity', 'lab'],
        required: true
    },
    threshold: {
        type: Number,
        required: true
    },
    period: {
        type: String, // 'daily', 'monthly', 'bi-monthly'
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rule', RuleSchema);
