const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Submission = require('../models/Submission');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// POST - Create new submission
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const imagePaths = req.files.map(file => file.path);
        
        const submission = new Submission({
            name: req.body.name,
            socialMediaHandle: req.body.socialMediaHandle,
            images: imagePaths
        });

        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET - Fetch all submissions
router.get('/', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;