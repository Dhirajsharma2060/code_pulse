// src/routes/collaborativeRoutes.js

const express = require('express');
const router = express.Router();
const collaborativeController = require('../controllers/collaborativeController');

// Define your routes
router.post('/editorData', (req, res) => {
    const { update } = req.body;
    // Handle incoming editor data
    collaborativeController.handleEditorData(req.io, { update });
    res.status(200).send('Data received');
});

module.exports = router;
