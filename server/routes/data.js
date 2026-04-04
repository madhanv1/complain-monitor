const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const LabData = require('../models/LabData');
const WaterData = require('../models/WaterData');
const ElectricityData = require('../models/ElectricityData');
const Rule = require('../models/Rule');
const User = require('../models/User'); 
const sendEmail = require('../utils/email');

// Utility to check violation
async function checkViolation(type, value, period) {
    const rule = await Rule.findOne({ category: type, period: period });
    if (rule && value > rule.threshold) {
        return { isViolation: true, threshold: rule.threshold };
    }
    return { isViolation: false };
}

// Utility to notify admins
async function notifyAdmins(message) {
    try {
        const admins = await User.find({ role: 'admin' });
        admins.forEach(admin => {
            sendEmail(admin.email, 'Compliance Violation Alert', message);
        });
    } catch (err) {
        console.error("Error sending email:", err);
    }
}

// @route POST api/data/lab
router.post('/lab', auth, async (req, res) => {
    if (req.user.role !== 'lab') return res.status(403).json({ msg: 'Access denied' });
    try {
        const { chemWaste, bioWaste, glassWaste, date } = req.body;
        const totalWaste = Number(chemWaste) + Number(bioWaste) + Number(glassWaste);
        
        const check = await checkViolation('lab', totalWaste, 'daily');
        const status = check.isViolation ? 'Violation' : 'Compliant';
        const violationMessage = check.isViolation ? `Daily limit ${check.threshold} exceeded` : '';

        if (check.isViolation) {
            await notifyAdmins(`Lab Violation: ${violationMessage} by User ${req.user.id}`);
        }

        const newData = new LabData({
            user: req.user.id,
            date,
            chemWaste, bioWaste, glassWaste,
            status,
            violationMessage
        });
        await newData.save();
        res.json(newData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/data/water
router.post('/water', auth, async (req, res) => {
    if (req.user.role !== 'water') return res.status(403).json({ msg: 'Access denied' });
    try {
         const { reading, consumption, date } = req.body;
         const check = await checkViolation('water', consumption, 'daily');
         const status = check.isViolation ? 'Violation' : 'Compliant';
         const violationMessage = check.isViolation ? `Daily limit ${check.threshold} exceeded` : '';

         if (check.isViolation) {
            await notifyAdmins(`Water Violation: ${violationMessage} by User ${req.user.id}`);
         }

         const newData = new WaterData({
             user: req.user.id, date,
             reading, consumption,
             status, violationMessage
         });
         await newData.save();
         res.json(newData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/data/electricity
router.post('/electricity', auth, async (req, res) => {
    if (req.user.role !== 'electricity') return res.status(403).json({ msg: 'Access denied' });
    try {
        const { reading, consumption, startDate, endDate, billingPeriod } = req.body;
        const check = await checkViolation('electricity', consumption, 'monthly');
        const status = check.isViolation ? 'Violation' : 'Compliant';
        const violationMessage = check.isViolation ? `Monthly limit ${check.threshold} exceeded` : '';

        if (check.isViolation) {
            await notifyAdmins(`Electricity Violation: ${violationMessage} by User ${req.user.id}`);
        }

        const newData = new ElectricityData({
            user: req.user.id,
            startDate, endDate, billingPeriod,
            reading, consumption,
            status, violationMessage
        });
        await newData.save();
        res.json(newData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/data/all (Admin)
router.get('/all', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    try {
        const lab = await LabData.find().populate('user', ['name', 'email', 'department']);
        const water = await WaterData.find().populate('user', ['name', 'email', 'department']);
        const electricity = await ElectricityData.find().populate('user', ['name', 'email', 'department']);
        res.json({ lab, water, electricity });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/data/lab-history
router.get('/lab-history', auth, async (req, res) => {
    try {
        const data = await LabData.find({ user: req.user.id }).sort({ date: -1 });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/data/water-history
router.get('/water-history', auth, async (req, res) => {
    try {
        const data = await WaterData.find({ user: req.user.id }).sort({ date: -1 });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/data/electricity-history
router.get('/electricity-history', auth, async (req, res) => {
    try {
        const data = await ElectricityData.find({ user: req.user.id }).sort({ startDate: -1 });
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
