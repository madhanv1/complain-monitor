const mongoose = require('mongoose');

const LabDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    chemWaste: { type: Number, required: true },
    bioWaste: { type: Number, required: true },
    glassWaste: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Compliant', 'Violation'], default: 'Pending' },
    violationMessage: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LabData', LabDataSchema);
