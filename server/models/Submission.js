const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    socialMediaHandle: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);