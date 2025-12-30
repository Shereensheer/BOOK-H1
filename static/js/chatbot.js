// Docusaurus Chatbot
document.addEventListener('DOMContentLoaded', function() {
  // Create chatbot container
  const chatbotDiv = document.createElement('div');
  chatbotDiv.id = 'docusaurus-chatbot';

  // Create the toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'chatbot-btn';
  toggleBtn.innerHTML = '💬';
  toggleBtn.title = 'AI Textbook Assistant';

  // Create the chat window
  const chatWindow = document.createElement('div');
  chatWindow.className = 'chatbot-window';

  // Create header
  const header = document.createElement('div');
  header.className = 'chatbot-header';
  header.textContent = 'AI Textbook Assistant';

  // Create messages container
  const messagesDiv = document.createElement('div');
  messagesDiv.className = 'chatbot-messages';

  // Create input area
  const inputArea = document.createElement('div');
  inputArea.className = 'chatbot-input-area';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'chatbot-input';
  input.placeholder = 'Ask about the textbook...';

  const sendBtn = document.createElement('button');
  sendBtn.className = 'chatbot-send-btn';
  sendBtn.textContent = 'Send';

  // Assemble the chat window
  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);
  chatWindow.appendChild(header);
  chatWindow.appendChild(messagesDiv);
  chatWindow.appendChild(inputArea);

  // Add to container
  chatbotDiv.appendChild(toggleBtn);
  chatbotDiv.appendChild(chatWindow);
  document.body.appendChild(chatbotDiv);

  // State
  let isOpen = false;

  // Toggle chat window
  toggleBtn.addEventListener('click', function() {
    if (isOpen) {
      chatWindow.style.display = 'none';
    } else {
      chatWindow.style.display = 'flex';
    }
    isOpen = !isOpen;
  });

  // Send message function
  function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.textContent = message;
    messagesDiv.appendChild(userMsg);

    // Clear input
    input.value = '';

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Show typing indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'message bot-message';
    typingMsg.id = 'typing-indicator';
    typingMsg.textContent = 'Thinking...';
    messagesDiv.appendChild(typingMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Simulate API call to backend
    setTimeout(() => {
      // Remove typing indicator
      const typingIndicator = document.getElementById('typing-indicator');
      if (typingIndicator) typingIndicator.remove();

      // Add bot response
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot-message';
      botMsg.textContent = `I received your question: "${message}". The backend API is ready to process textbook queries. API endpoints are available at:\n- POST /api/query\n- POST /api/reindex\n- GET /api/status`;
      messagesDiv.appendChild(botMsg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 1000);
  }

  // Send button click event
  sendBtn.addEventListener('click', sendMessage);

  // Enter key event
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
});