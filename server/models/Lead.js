const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        trim: true
    },
    source: {
        type: String,
        default: 'Website'
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Converted'],
        default: 'New'
    },
    notes: [{
        text: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    followUps: [{
        date: Date,
        description: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
