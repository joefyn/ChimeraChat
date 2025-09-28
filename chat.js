class ChimeraChat {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        
        this.setupEventListeners();
        this.capabilities = this.initializeCapabilities();
    }

    initializeCapabilities() {
        return {
            general: [
                "I can engage in natural conversations about my features and abilities",
                "I can explain technical concepts in an easy-to-understand way",
                "I can adapt my responses based on the context of our conversation",
                "I can maintain conversation history and context throughout our chat"
            ],
            communication: [
                "I can answer questions about my capabilities in real-time",
                "I can provide detailed explanations or brief summaries as needed",
                "I can communicate in a friendly, professional manner",
                "I can handle multiple topics and switch between them smoothly"
            ],
            interface: [
                "I provide a clean, modern web-based chat interface",
                "I support real-time messaging with immediate responses",
                "I have a responsive design that works on different screen sizes",
                "I include visual indicators for better user experience"
            ],
            intelligence: [
                "I can understand various ways of asking about capabilities",
                "I can provide relevant examples and use cases",
                "I can suggest related topics you might be interested in",
                "I can learn from our conversation to provide better responses"
            ]
        };
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });
    }

    handleSendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.userInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = 'ChimeraChat is typing...';
        
        typingDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm excited to tell you about what I can do. What would you like to know about my capabilities?";
        }
        
        // Capabilities questions
        if (message.includes('what can you do') || message.includes('capabilities') || message.includes('features')) {
            return this.getCapabilitiesOverview();
        }
        
        // Communication questions
        if (message.includes('communicate') || message.includes('talk') || message.includes('conversation')) {
            return this.getCommunicationCapabilities();
        }
        
        // Technical questions
        if (message.includes('how do you work') || message.includes('technical') || message.includes('technology')) {
            return "I'm built using modern web technologies including HTML5, CSS3, and JavaScript. I use a simple but effective pattern matching system to understand your questions and provide relevant responses about my capabilities. My interface is responsive and designed for optimal user experience.";
        }
        
        // Interface questions
        if (message.includes('interface') || message.includes('design') || message.includes('ui') || message.includes('user')) {
            return this.getInterfaceCapabilities();
        }
        
        // Help questions
        if (message.includes('help') || message.includes('what should i ask')) {
            return "You can ask me about:\n• My general capabilities and features\n• How I communicate and handle conversations\n• My user interface and design\n• The technology behind me\n• Specific examples of what I can do\n\nTry asking something like 'What are your main features?' or 'How do you work?'";
        }
        
        // Examples
        if (message.includes('example') || message.includes('show me')) {
            return "Here's an example of what I can do: Right now, I'm analyzing your message, understanding your intent, and providing a relevant response about my capabilities. I can explain complex topics simply, maintain context throughout our conversation, and adapt my responses to what you're most interested in learning about.";
        }
        
        // Limitations
        if (message.includes('limitation') || message.includes('cannot') || message.includes('can\'t')) {
            return "I'm designed specifically to discuss my capabilities, so I focus on that topic. I work best when you ask about my features, how I function, or what I can help you understand about AI chat systems. I'm always honest about what I can and cannot do within my scope.";
        }
        
        // Default response with capability hint
        return this.getRandomCapabilityResponse();
    }

    getCapabilitiesOverview() {
        return "I have several key capabilities:\n\n🗣️ Communication: I can engage in natural conversations and explain concepts clearly\n💻 Interface: I provide a modern, responsive web chat experience\n🧠 Intelligence: I understand context and can provide relevant, helpful responses\n🔧 Technical: I'm built with web technologies and designed for reliability\n\nWhat specific area would you like to know more about?";
    }

    getCommunicationCapabilities() {
        const comms = this.capabilities.communication;
        const selected = comms[Math.floor(Math.random() * comms.length)];
        return `One of my key communication strengths is that ${selected.toLowerCase()}. I'm designed to make our conversation natural and informative. Would you like to know about any other aspects of how I communicate?`;
    }

    getInterfaceCapabilities() {
        return "My interface capabilities include:\n• Clean, modern design with smooth interactions\n• Real-time messaging with typing indicators\n• Responsive layout that works on desktop and mobile\n• Intuitive chat experience with message history\n• Visual feedback and easy-to-use input controls\n\nThe goal is to make chatting about capabilities as seamless as possible!";
    }

    getRandomCapabilityResponse() {
        const allCapabilities = [
            ...this.capabilities.general,
            ...this.capabilities.communication,
            ...this.capabilities.interface,
            ...this.capabilities.intelligence
        ];
        
        const randomCapability = allCapabilities[Math.floor(Math.random() * allCapabilities.length)];
        return `Here's something I can do: ${randomCapability}. Feel free to ask me more specific questions about my capabilities or try asking "what can you do?" for a complete overview!`;
    }
}

// Initialize the chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChimeraChat();
});