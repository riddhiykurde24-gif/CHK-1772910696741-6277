const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'frontend')));
app.use('/static', express.static(path.join(__dirname, 'frontend/static')));

// Serve index.html from templates
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Chat API endpoint
app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  // Import responses dynamically (or require at top)
  const { getResponse } = require('./frontend/src/data/responses');
  const botReply = getResponse(userMessage);
  res.json({ reply: botReply });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});