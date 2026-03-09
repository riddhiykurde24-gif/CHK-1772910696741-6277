export function formatMessage(text) {
    return text.replace(/\n/g, '<br>');
}

export function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}