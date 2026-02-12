const mongoose = require('mongoose');

const WaterDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    reading: { type: Number, required: true },
    consumption: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Compliant', 'Violation'], default: 'Pending' },
    violationMessage: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WaterData', WaterDataSchema);
