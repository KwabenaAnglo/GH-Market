// WhatsApp Chat Widget
class WhatsAppChat {
    constructor() {
        this.whatsappFloat = document.getElementById('whatsappFloat');
        this.whatsappWidget = document.getElementById('whatsappWidget');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.minimizeBtn = document.getElementById('minimizeChat');
        this.sendMessageBtn = document.getElementById('sendMessageBtn');
        this.isMinimized = false;
        
        this.initialize();
    }
    
    initialize() {
        // Add event listeners
        this.whatsappFloat.addEventListener('click', () => this.toggleChat());
        this.minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMinimize();
        });
        this.sendMessageBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Initial greeting
        this.addMessage("Hello! How can we help you today?", 'received');
    }
    
    toggleChat() {
        if (this.isMinimized) {
            this.whatsappWidget.classList.add('show');
            this.whatsappFloat.style.display = 'none';
            this.isMinimized = false;
        } else if (this.whatsappWidget.classList.contains('show')) {
            this.whatsappWidget.classList.remove('show');
            this.whatsappFloat.style.display = 'flex';
        } else {
            this.whatsappWidget.classList.add('show');
            this.whatsappFloat.style.display = 'none';
        }
    }
    
    toggleMinimize() {
        this.whatsappWidget.classList.remove('show');
        this.whatsappFloat.style.display = 'flex';
        this.isMinimized = true;
    }
    
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageText = document.createElement('p');
        messageText.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        timeSpan.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageText);
        messageDiv.appendChild(timeSpan);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        this.addMessage(message, 'sent');
        this.chatInput.value = '';
        
        // Simulate response after a short delay
        setTimeout(() => {
            this.autoRespond(message);
        }, 1000);
    }
    
    autoRespond(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response;
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            response = "Prices vary depending on the product. Could you please specify which item you're interested in?";
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('ship')) {
            response = "We offer delivery within Ghana. Delivery times and fees depend on your location. Could you please provide your city?";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
            response = "You can reach our support team at support@ghmarket.com or call us at +233 XX XXX XXXX. Our working hours are Monday to Friday, 9 AM to 5 PM GMT.";
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            response = "You're welcome! Is there anything else I can help you with?";
        } else {
            response = "Thank you for your message. Our team will get back to you shortly. For immediate assistance, please call +233 XX XXX XXXX.";
        }
        
        this.addMessage(response, 'received');
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        return `${hours}:${minutes} ${ampm}`;
    }
}

// Initialize the chat when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppChat();
});
