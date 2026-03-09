const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

// Send message
router.post('/message', ChatController.processMessage);

// Get conversation history
router.get('/history/:sessionId', ChatController.getHistory);

// Clear conversation
router.delete('/history/:sessionId', ChatController.clearHistory);

// Get suggested questions
router.get('/suggestions', ChatController.getSuggestions);

// Track user feedback
router.post('/feedback', ChatController.saveFeedback);

module.exports = router;