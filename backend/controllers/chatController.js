const ResponseEngine = require('../services/responseEngine');
const Conversation = require('../models/Conversation');
const Feedback = require('../models/Feedback');
const { v4: uuidv4 } = require('uuid');

class ChatController {
  // Process incoming messages
  static async processMessage(req, res) {
    try {
      const { message, sessionId, userInfo } = req.body;
      const currentSessionId = sessionId || uuidv4();

      // Get bot response
      const response = await ResponseEngine.getResponse(message, userInfo);

      // Save conversation to database
      const conversation = new Conversation({
        sessionId: currentSessionId,
        messages: [
          { text: message, sender: 'user', timestamp: new Date() },
          { text: response.text, sender: 'bot', timestamp: new Date() }
        ],
        userInfo: userInfo || {}
      });

      await conversation.save();

      // Track analytics
      await ResponseEngine.trackQuery(message, response.category);

      res.json({
        success: true,
        sessionId: currentSessionId,
        response: response.text,
        category: response.category,
        suggestions: response.suggestions,
        timestamp: new Date()
      });

    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  }

  // Get conversation history
  static async getHistory(req, res) {
    try {
      const { sessionId } = req.params;
      
      const conversations = await Conversation.find({ sessionId })
        .sort({ 'messages.timestamp': -1 })
        .limit(50);

      res.json({
        success: true,
        history: conversations
      });

    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch history' 
      });
    }
  }

  // Clear conversation history
  static async clearHistory(req, res) {
    try {
      const { sessionId } = req.params;
      
      await Conversation.deleteMany({ sessionId });

      res.json({
        success: true,
        message: 'History cleared successfully'
      });

    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to clear history' 
      });
    }
  }

  // Get suggested questions
  static async getSuggestions(req, res) {
    try {
      const suggestions = await ResponseEngine.getPopularSuggestions();
      
      res.json({
        success: true,
        suggestions
      });

    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch suggestions' 
      });
    }
  }

  // Save user feedback
  static async saveFeedback(req, res) {
    try {
      const { sessionId, messageId, rating, comment } = req.body;

      const feedback = new Feedback({
        sessionId,
        messageId,
        rating,
        comment,
        timestamp: new Date()
      });

      await feedback.save();

      res.json({
        success: true,
        message: 'Feedback saved successfully'
      });

    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to save feedback' 
      });
    }
  }
}

module.exports = ChatController;