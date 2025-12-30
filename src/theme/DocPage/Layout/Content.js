import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider } from '@site/src/components/auth/AuthProvider';
import AuthButton from '@site/src/components/auth/AuthButton';

// Chatbot component
function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant for the Physical AI & Humanoid Robotics textbook. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate API response
      const response = {
        role: 'assistant',
        content: `I received your question: "${inputValue}". The backend API is ready to process textbook queries. API endpoints are available at:\n- POST /api/query\n- POST /api/reindex\n- GET /api/status`
      };

      setMessages(prev => [...prev, response]);
    } catch (err) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container" style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 10000,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {isOpen ? (
        <div style={{
          width: '380px',
          height: '500px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '16px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>AI Textbook Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          <div
            ref={messagesEndRef}
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundColor: '#f9fafb',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  marginBottom: '8px',
                  backgroundColor: msg.role === 'user' ? '#3B82F6' : '#e5e7eb',
                  color: msg.role === 'user' ? 'white' : '#374151',
                  fontSize: '14px',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginLeft: msg.role === 'user' ? 'auto' : '0'
                }}
              >
                <strong>{msg.role === 'user' ? 'You:' : 'AI Assistant:'}</strong> {msg.content}
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  borderRadius: '18px',
                  marginBottom: '8px',
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  fontSize: '14px',
                  alignSelf: 'flex-start'
                }}
              >
                <strong>AI Assistant:</strong> Thinking...
              </div>
            )}
          </div>

          <div style={{
            padding: '12px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: 'white',
            display: 'flex'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about the textbook..."
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                marginRight: '8px',
                fontSize: '14px'
              }}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: '10px 16px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#3B82F6',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '24px',
            border: 'none',
            outline: 'none'
          }}
          title="AI Textbook Assistant"
        >
          🤖
        </button>
      )}
    </div>
  );
}

export default function DocPageLayoutContent({ children }) {
  return (
    <AuthProvider>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10001
        }}>
          {/* <AuthButton /> */}
        </div>
        {children}
      </div>
      <ChatbotWidget />
    </AuthProvider>
  );
}