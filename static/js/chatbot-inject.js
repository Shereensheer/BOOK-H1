// Simple chatbot injection script
// This creates the chatbot UI dynamically
document.addEventListener('DOMContentLoaded', function() {
  // Create the chatbot container
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'chatbot-container';
  document.body.appendChild(chatbotContainer);

  // Create the chatbot button
  const chatButton = document.createElement('div');
  chatButton.style.position = 'fixed';
  chatButton.style.bottom = '24px';
  chatButton.style.right = '24px';
  chatButton.style.zIndex = '9999';
  chatButton.style.backgroundColor = '#3B82F6';
  chatButton.style.color = 'white';
  chatButton.style.borderRadius = '50%';
  chatButton.style.width = '60px';
  chatButton.style.height = '60px';
  chatButton.style.display = 'flex';
  chatButton.style.alignItems = 'center';
  chatButton.style.justifyContent = 'center';
  chatButton.style.cursor = 'pointer';
  chatButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  chatButton.style.fontSize = '24px';
  chatButton.innerHTML = '💬';
  chatButton.title = 'AI Textbook Assistant';

  // Add hover effect
  chatButton.addEventListener('mouseenter', () => {
    chatButton.style.backgroundColor = '#2563EB';
  });

  chatButton.addEventListener('mouseleave', () => {
    chatButton.style.backgroundColor = '#3B82F6';
  });

  // Click handler
  let isOpen = false;
  chatButton.addEventListener('click', () => {
    if (isOpen) {
      alert('Chat interface would open here. The full React component needs to be built and compiled.');
    } else {
      alert('AI Textbook Assistant\n\nThis is where the chat interface would appear.\n\nBackend API endpoints are ready:\n- POST /api/query\n- POST /api/reindex\n- GET /api/status');
    }
    isOpen = !isOpen;
  });

  document.body.appendChild(chatButton);
});