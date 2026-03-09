const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Update responses
router.post('/responses', AdminController.updateResponses);

// Get analytics
router.get('/analytics', AdminController.getAnalytics);

// Get popular queries
router.get('/popular-queries', AdminController.getPopularQueries);

// Update suggested questions
router.post('/suggestions', AdminController.updateSuggestions);

module.exports = router;