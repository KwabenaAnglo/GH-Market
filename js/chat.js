// Format time function
function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Main chat functionality
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Chat widget initializing...');
    
    // Configuration
    const CONFIG = {
        whatsappNumber: '233543274451', // Ghana number with country code
        businessName: 'GH Market',
        businessHours: '9:00 AM - 6:00 PM (GMT)',
        defaultMessage: 'Hello! I need assistance with an item on GH Market.'
    };
    
    // DOM Elements
    const elements = {
        chatToggle: document.getElementById('chatToggle'),
        chatContainer: document.getElementById('chatContainer'),
        chatInput: document.getElementById('chatInput'),
        sendButton: document.getElementById('sendMessageBtn'),
        chatMessages: document.getElementById('chatMessages'),
        minimizeBtn: document.getElementById('minimizeChat'),
        closeBtn: document.getElementById('closeChat')
    };
    
    // Check if all required elements exist
    if (!elements.chatToggle || !elements.chatContainer || !elements.chatInput || 
        !elements.sendButton || !elements.chatMessages) {
        console.error('Required chat elements not found');
        return;
    }
    
    // Toggle chat visibility
    function toggleChat() {
        console.log('Toggle chat called');
        elements.chatContainer.classList.toggle('visible');
        elements.chatToggle.style.opacity = elements.chatContainer.classList.contains('visible') ? '0' : '1';
        
        if (elements.chatContainer.classList.contains('visible')) {
            elements.chatInput.focus();
        }
    }
    
    // Close chat completely
    function closeChat() {
        elements.chatContainer.classList.remove('visible');
        elements.chatToggle.style.opacity = '1';
    }
    
    // Add message to chat
    function addMessage(text, type = 'received') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        // Convert newlines to paragraphs
        const messageText = text.split('\n').map(paragraph => 
            paragraph.trim() ? `<p>${paragraph}</p>` : ''
        ).join('');
        
        messageDiv.innerHTML = `
            ${messageText}
            <span class="message-time">${formatTime()}</span>
        `;
        
        elements.chatMessages.appendChild(messageDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }
    
    // Handle sending messages
    function sendMessage() {
        const message = elements.chatInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'sent');
        elements.chatInput.value = '';
        
        // Get user info if available
        let userName = 'Guest';
        let userEmail = 'Not logged in';
        
        // Check if Firebase is available and user is logged in
        if (typeof firebase !== 'undefined' && firebase.auth().currentUser) {
            const user = firebase.auth().currentUser;
            userName = user.displayName || 'Guest';
            userEmail = user.email || 'Not provided';
        }
        
        const currentPage = window.location.href;
        
        // Format message for WhatsApp
        const formattedMessage = `*New Message from GH Market*\n\n` +
            `*Name:* ${userName}\n` +
            `*Email:* ${userEmail}\n` +
            `*Page:* ${currentPage}\n\n` +
            `*Message:*\n${message}`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(formattedMessage);
        
        // Open WhatsApp with pre-filled message in a new tab
        const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        
        // Add automatic reply
        setTimeout(() => {
            addMessage('Thank you for your message! Our team will get back to you as soon as possible. \n\nYou can also reach us directly on WhatsApp if you need immediate assistance.', 'received');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, type) {
        if (!elements.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            ${text}
            <div class="message-time">${formatTime()}</div>
        `;
        elements.chatMessages.appendChild(messageDiv);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }
    
    // Format time
    function formatTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Event listeners for sending messages
    const sendButton = document.getElementById('sendMessageBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (sendButton && chatInput) {
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error('Could not find chat input elements');
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (state.isChatOpen && 
            !elements.chatContainer.contains(e.target) && 
            !elements.chatToggle.contains(e.target)) {
            toggleChat();
        }
    });
    
    // Initialize chat after a short delay
    setTimeout(() => {
        if (elements.chatToggle) {
            elements.chatToggle.style.display = 'flex';
        }
    }, 1000);
});
