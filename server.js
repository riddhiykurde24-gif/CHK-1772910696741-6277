// server.js - Academic & Admin Chatbot Backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// AI Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Academic Knowledge Base (RAG-style)
const knowledgeBase = {
    admissions: "Admission process: Apply online → Pay ₹500 → Submit 10th/12th marks. UG deadline: June 30, PG: July 15.",
    courses: "Popular courses: B.Tech CS/IT (₹50k/yr), BBA (₹45k/yr), MSc (₹60k/yr). Syllabus on student portal.",
    exams: "Exams: Midterms Apr 10-15, Finals May 20-30. Results via student portal with roll number.",
    fees: "Fees: UG ₹50k/yr, PG ₹60k/yr. Pay via UPI/Netbanking. Installments available.",
    hostel: "Hostel: ₹30k/yr shared room. Apply after admission. 80% availability.",
    scholarships: "Merit (top 10%): ₹20k, Need-based (income <₹5L): ₹25k. Apply by May 1."
};

// Main Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, userId = 'student1' } = req.body;
        
        // Intent detection & knowledge retrieval
        let context = '';
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('admission') || lowerMsg.includes('apply')) context = knowledgeBase.admissions;
        else if (lowerMsg.includes('course') || lowerMsg.includes('syllabus')) context = knowledgeBase.courses;
        else if (lowerMsg.includes('exam') || lowerMsg.includes('result')) context = knowledgeBase.exams;
        else if (lowerMsg.includes('fee') || lowerMsg.includes('payment')) context = knowledgeBase.fees;
        else if (lowerMsg.includes('hostel')) context = knowledgeBase.hostel;
        else if (lowerMsg.includes('scholarship')) context = knowledgeBase.scholarships;

        // AI Prompt with context
        const prompt = `You are an Academic & Admin Support AI. 
Context: ${context}
Student query: ${message}

Respond concisely, professionally. Use bullet points for lists. If no context matches, say "I'll connect you to admin support."`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or "gpt-3.5-turbo"
            messages: [
                { role: "system", content: prompt },
                { role: "user", content: message }
            ],
            max_tokens: 300,
            temperature: 0.3
        });

        const reply = completion.choices[0].message.content;

        // Send response
        res.json({
            success: true,
            reply: reply,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            success: false,
            reply: "Sorry, I'm experiencing technical issues. Please try again."
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Academic Chatbot Backend - Running', port: PORT });
});

app.listen(PORT, () => {
    console.log(`🚀 Academic Chatbot Backend running on http://localhost:${PORT}`);
    console.log(`📱 Test endpoint: POST http://localhost:${PORT}/api/chat`);
});