// This file serves as the entry point for the frontend
// It imports the main chatbot functionality

import { addMessage, showTypingIndicator, getBotResponse } from '../frontend/src/utils/helpers.js';

let conversationHistory = [];

// Attach functions to window so onclick attributes work
window.sendMessage = function() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    // Add user message
    const userMsg = addMessage(text, 'user');
    conversationHistory.push(userMsg);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator(true);
    
    // Simulate bot typing delay
    setTimeout(() => {
        // Get and add bot response
        const response = getBotResponse(text);
        const botMsg = addMessage(response, 'bot');
        conversationHistory.push(botMsg);
        showTypingIndicator(false);
    }, 1000);
};

window.quickQuestion = function(question) {
    document.getElementById('userInput').value = question;
    window.sendMessage();
};

window.clearChat = function() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        document.getElementById('messages').innerHTML = '';
        conversationHistory = [];
        // Add welcome message
        setTimeout(() => {
            const welcomeMsg = addMessage('👋 Chat cleared! How can I help you today? Type "menu" to see options.', 'bot');
            conversationHistory.push(welcomeMsg);
        }, 100);
    }
};

// Handle Enter key and initialisation
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            window.sendMessage();
        }
    });

    // Load chat with welcome message
    const welcomeMsg = addMessage('👋 Hello! I\'m your University Assistant. I can help you with admissions, courses, exams, fees, scholarships, and more! Type "menu" to see all options or select from the suggested questions below.', 'bot');
    conversationHistory.push(welcomeMsg);
    
    // Focus on input
    document.getElementById('userInput').focus();
});