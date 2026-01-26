const express = require('express');
const router = express.Router();
const {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead
} = require('../controllers/leadController');

const { protect } = require('../middleware/authMiddleware');

// Public route for contact form
router.route('/').post(createLead);

// Protected Admin routes
router.route('/').get(protect, getLeads);

router.route('/:id')
    .get(protect, getLead)
    .put(protect, updateLead)
    .delete(protect, deleteLead);

module.exports = router;
