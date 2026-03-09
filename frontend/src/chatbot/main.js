import { responses } from '../data/responses.js';
import { formatMessage, getCurrentTime } from '../utils/helpers.js';

export function getBotResponse(userInput) {
    const key = userInput.toLowerCase().trim();
    return responses[key] || 'Sorry, I do not understand. Try asking about admissions, exams, fees, etc.';
}

export function createMessage(text, sender) {
    return {
        text: formatMessage(text),
        sender,
        time: getCurrentTime()
    };
}