import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import useChatbot from './useChatbot';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  onClose: () => void;
  onNewMessage?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, onNewMessage }) => {
  const { messages, sendMessage, isLoading, error } = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Get selected text if any
    const selectedText = window.getSelection()?.toString().trim();

    // Use the hook to send the message
    await sendMessage(inputValue, selectedText);

    setInputValue('');

    if (onNewMessage) {
      onNewMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col max-w-full max-h-[80vh]">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">AI Textbook Assistant</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg.content}
            isUser={msg.role === 'user'}
          />
        ))}

        {isLoading && (
          <MessageBubble
            message="Thinking..."
            isUser={false}
            isLoading={true}
          />
        )}

        {error && (
          <MessageBubble
            message={error}
            isUser={false}
            isError={true}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 bg-white">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about the textbook..."
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || inputValue.trim() === ''}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Selected text will be included as context
        </p>
      </form>
    </div>
  );
};

export default ChatWindow;