const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  sessionId: String,
  messageId: mongoose.Schema.Types.ObjectId,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: String,
  category: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);