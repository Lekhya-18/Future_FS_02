const Lead = require('../models/Lead');

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
exports.createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private (Admin)
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private (Admin)
exports.getLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update lead (status, notes, etc.)
// @route   PUT /api/leads/:id
// @access  Private (Admin)
exports.updateLead = async (req, res) => {
    try {
        const { status, note, followUp } = req.body;
        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }

        // Handle specific updates
        if (status) lead.status = status;
        if (note) lead.notes.push({ text: note });
        if (followUp) lead.followUps.push(followUp);

        // General update for other fields if any
        // Object.assign(lead, req.body); // Uncomment if general updates are needed

        await lead.save();
        res.status(200).json({ success: true, data: lead });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ success: false, error: 'Lead not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
