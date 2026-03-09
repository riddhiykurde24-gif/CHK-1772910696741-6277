const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  sender: {
    type: String,
    enum: ['user', 'bot']
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [messageSchema],
  userInfo: {
    name: String,
    email: String,
    department: String,
    year: String
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: Number
});

conversationSchema.pre('save', function(next) {
  if (this.messages && this.messages.length > 0) {
    this.endTime = new Date();
    this.duration = this.endTime - this.startTime;
  }
  next();
});

module.exports = mongoose.model('Conversation', conversationSchema);