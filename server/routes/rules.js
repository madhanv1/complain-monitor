const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Rule = require('../models/Rule');

// @route POST api/rules
// @desc Create or update a rule (Admin only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Access denied' });
    const { type, category, threshold, period } = req.body;
    try {
        let rule = await Rule.findOne({ type });
        if (rule) {
            rule.threshold = threshold;
            rule.period = period;
            rule.lastUpdated = Date.now();
            await rule.save();
            return res.json(rule);
        }
        rule = new Rule({ type, category, threshold, period });
        await rule.save();
        res.json(rule);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/rules
// @desc Get all rules
router.get('/', auth, async (req, res) => {
    try {
        const rules = await Rule.find();
        res.json(rules);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
