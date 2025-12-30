(function() {
  'use strict';

  // Wait for the page to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChatbot);
  } else {
    initializeChatbot();
  }

  function initializeChatbot() {
    // Create the chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'docusaurus-ai-chatbot';
    chatbotContainer.style.position = 'fixed';
    chatbotContainer.style.bottom = '24px';
    chatbotContainer.style.right = '24px';
    chatbotContainer.style.zIndex = '10000';
    chatbotContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    // Create the chat button
    const chatButton = document.createElement('button');
    chatButton.id = 'chatbot-toggle-btn';
    chatButton.innerHTML = '🤖';
    chatButton.style.width = '60px';
    chatButton.style.height = '60px';
    chatButton.style.borderRadius = '50%';
    chatButton.style.backgroundColor = '#3B82F6';
    chatButton.style.color = 'white';
    chatButton.style.display = 'flex';
    chatButton.style.alignItems = 'center';
    chatButton.style.justifyContent = 'center';
    chatButton.style.cursor = 'pointer';
    chatButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    chatButton.style.fontSize = '24px';
    chatButton.style.border = 'none';
    chatButton.style.outline = 'none';
    chatButton.title = 'AI Textbook Assistant';

    // Add hover effect
    chatButton.addEventListener('mouseenter', () => {
      chatButton.style.backgroundColor = '#2563EB';
    });
    chatButton.addEventListener('mouseleave', () => {
      chatButton.style.backgroundColor = '#3B82F6';
    });

    // Create the chat window (initially hidden)
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.style.width = '380px';
    chatWindow.style.height = '500px';
    chatWindow.style.backgroundColor = 'white';
    chatWindow.style.borderRadius = '12px';
    chatWindow.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    chatWindow.style.display = 'none'; // Initially hidden
    chatWindow.style.flexDirection = 'column';
    chatWindow.style.overflow = 'hidden';
    chatWindow.style.border = '1px solid #e5e7eb';

    // Create header
    const header = document.createElement('div');
    header.style.backgroundColor = '#3B82F6';
    header.style.color = 'white';
    header.style.padding = '16px';
    header.style.fontWeight = 'bold';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.innerHTML = '<span>AI Textbook Assistant</span><button id="chatbot-close-btn" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">✕</button>';

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'chatbot-messages';
    messagesContainer.style.flex = '1';
    messagesContainer.style.padding = '16px';
    messagesContainer.style.overflowY = 'auto';
    messagesContainer.style.backgroundColor = '#f9fafb';

    // Add initial welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'chatbot-message';
    welcomeMsg.style.maxWidth = '80%';
    welcomeMsg.style.padding = '10px 14px';
    welcomeMsg.style.borderRadius = '18px';
    welcomeMsg.style.marginBottom = '8px';
    welcomeMsg.style.backgroundColor = '#e5e7eb';
    welcomeMsg.style.color = '#374151';
    welcomeMsg.style.fontSize = '14px';
    welcomeMsg.innerHTML = '<strong>AI Assistant:</strong> Hello! I can help you with questions about the Physical AI & Humanoid Robotics textbook. What would you like to know?';
    messagesContainer.appendChild(welcomeMsg);

    // Create input area
    const inputArea = document.createElement('div');
    inputArea.style.padding = '12px';
    inputArea.style.borderTop = '1px solid #e5e7eb';
    inputArea.style.backgroundColor = 'white';
    inputArea.style.display = 'flex';
    inputArea.innerHTML = `
      <input
        type="text"
        id="chatbot-input"
        placeholder="Ask about the textbook..."
        style="flex: 1; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; margin-right: 8px; font-size: 14px;"
      >
      <button
        id="chatbot-send-btn"
        style="padding: 10px 16px; background-color: #3B82F6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;"
      >
        Send
      </button>
    `;

    // Assemble the chat window
    chatWindow.appendChild(header);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputArea);

    // Add everything to the container
    chatbotContainer.appendChild(chatButton);
    chatbotContainer.appendChild(chatWindow);

    // Add to document body
    document.body.appendChild(chatbotContainer);

    // Add functionality
    let isOpen = false;

    // Toggle chat window (both from navbar button and floating button)
    function toggleChat() {
      chatWindow.style.display = isOpen ? 'none' : 'flex';
      isOpen = !isOpen;
    }

    // Add event listener to navbar button if it exists
    const navbarBtn = document.getElementById('navbar-chatbot-btn');
    if (navbarBtn) {
      navbarBtn.addEventListener('click', toggleChat);
    }

    // Also keep the floating button functionality
    chatButton.addEventListener('click', function() {
      // Only toggle if we're not using the navbar button approach
      if (!navbarBtn || !isOpen) {
        toggleChat();
      }
    });

    // Close button functionality
    document.getElementById('chatbot-close-btn').addEventListener('click', function() {
      chatWindow.style.display = 'none';
      isOpen = false;
    });

    // Send message functionality
    document.getElementById('chatbot-send-btn').addEventListener('click', sendMessage);
    document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    function sendMessage() {
      const input = document.getElementById('chatbot-input');
      const message = input.value.trim();
      if (!message) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'chatbot-message';
      userMsg.style.maxWidth = '80%';
      userMsg.style.padding = '10px 14px';
      userMsg.style.borderRadius = '18px';
      userMsg.style.marginBottom = '8px';
      userMsg.style.backgroundColor = '#3B82F6';
      userMsg.style.color = 'white';
      userMsg.style.fontSize = '14px';
      userMsg.style.alignSelf = 'flex-end';
      userMsg.style.marginLeft = 'auto';
      userMsg.innerHTML = '<strong>You:</strong> ' + message;
      document.getElementById('chatbot-messages').appendChild(userMsg);

      // Clear input
      input.value = '';

      // Scroll to bottom
      const messagesDiv = document.getElementById('chatbot-messages');
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      // Show typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.id = 'typing-indicator';
      typingIndicator.className = 'chatbot-message';
      typingIndicator.style.maxWidth = '80%';
      typingIndicator.style.padding = '10px 14px';
      typingIndicator.style.borderRadius = '18px';
      typingIndicator.style.marginBottom = '8px';
      typingIndicator.style.backgroundColor = '#e5e7eb';
      typingIndicator.style.color = '#374151';
      typingIndicator.style.fontSize = '14px';
      typingIndicator.innerHTML = '<strong>AI Assistant:</strong> Thinking...';
      document.getElementById('chatbot-messages').appendChild(typingIndicator);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      // Simulate API response after delay
      setTimeout(() => {
        // Remove typing indicator
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();

        // Add bot response
        const botMsg = document.createElement('div');
        botMsg.className = 'chatbot-message';
        botMsg.style.maxWidth = '80%';
        botMsg.style.padding = '10px 14px';
        botMsg.style.borderRadius = '18px';
        botMsg.style.marginBottom = '8px';
        botMsg.style.backgroundColor = '#e5e7eb';
        botMsg.style.color = '#374151';
        botMsg.style.fontSize = '14px';
        botMsg.innerHTML = `<strong>AI Assistant:</strong> I received your question: "${message}". The backend API is ready to process textbook queries. API endpoints are available at:<br/>- POST /api/query<br/>- POST /api/reindex<br/>- GET /api/status`;
        document.getElementById('chatbot-messages').appendChild(botMsg);

        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }, 1500);
    }

    // Make sure chat window stays in view
    window.addEventListener('resize', function() {
      if (isOpen) {
        chatWindow.style.display = 'flex';
      }
    });
  }
})();