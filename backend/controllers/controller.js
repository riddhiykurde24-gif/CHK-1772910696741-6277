const ResponseEngine = require('../services/responseEngine');
const Conversation = require('../models/Conversation');
const Feedback = require('../models/Feedback');
const QueryTracker = require('../models/QueryTracker');

class AdminController {
  // Update responses
  static async updateResponses(req, res) {
    try {
      const { category, text, suggestions } = req.body;
      
      if (ResponseEngine.responses[category]) {
        ResponseEngine.responses[category].text = text || ResponseEngine.responses[category].text;
        ResponseEngine.responses[category].suggestions = suggestions || ResponseEngine.responses[category].suggestions;
        
        res.json({
          success: true,
          message: `Response for '${category}' updated successfully`
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'Category not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update response'
      });
    }
  }

  // Get analytics
  static async getAnalytics(req, res) {
    try {
      const { startDate, endDate } = req.query;
      
      const query = {};
      if (startDate || endDate) {
        query.timestamp = {};
        if (startDate) query.timestamp.$gte = new Date(startDate);
        if (endDate) query.timestamp.$lte = new Date(endDate);
      }

      const totalConversations = await Conversation.countDocuments(query);
      const totalFeedbacks = await Feedback.countDocuments(query);
      const averageRating = await Feedback.aggregate([
        { $match: query },
        { $group: { _id: null, avg: { $avg: '$rating' } } }
      ]);

      const popularQueries = await QueryTracker.aggregate([
        { $match: query },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);

      const userSatisfaction = {
        positive: await Feedback.countDocuments({ ...query, rating: { $gte: 4 } }),
        neutral: await Feedback.countDocuments({ ...query, rating: 3 }),
        negative: await Feedback.countDocuments({ ...query, rating: { $lte: 2 } })
      };

      res.json({
        success: true,
        analytics: {
          totalConversations,
          totalFeedbacks,
          averageRating: averageRating[0]?.avg || 0,
          popularQueries,
          userSatisfaction,
          timestamp: new Date()
        }
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch analytics'
      });
    }
  }

  // Get popular queries
  static async getPopularQueries(req, res) {
    try {
      const { limit = 20 } = req.query;
      
      const popularQueries = await QueryTracker.aggregate([
        { $group: { 
          _id: { 
            category: '$category',
            query: '$query' 
          }, 
          count: { $sum: 1 } 
        }},
        { $sort: { count: -1 } },
        { $limit: parseInt(limit) }
      ]);

      res.json({
        success: true,
        popularQueries
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch popular queries'
      });
    }
  }

  // Update suggested questions
  static async updateSuggestions(req, res) {
    try {
      const { suggestions } = req.body;
      
      // Update the default response suggestions
      if (ResponseEngine.responses['default']) {
        ResponseEngine.responses['default'].suggestions = suggestions;
      }

      res.json({
        success: true,
        message: 'Suggestions updated successfully'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update suggestions'
      });
    }
  }
}

module.exports = AdminController;