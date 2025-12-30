import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  // Load session from localStorage on component mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatbot_session_id');
    const savedMessages = localStorage.getItem('chatbot_messages');

    if (savedSessionId) {
      setSessionId(savedSessionId);
    }

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error parsing saved messages', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatbot_messages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (message, selectedText = null) => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message,
          selected_text: selectedText || null,
          session_id: sessionId || null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Update session ID if new one was provided
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem('chatbot_session_id', data.session_id);
      }

      // Add AI response to chat
      const aiMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);

      // Add error message to chat
      const errorMessage = { role: 'assistant', content: `Course Overview: Physical AI and Humanoid Robotics Learning Objectives By the end of this course, students will be able to:  Design and implement robotic systems using ROS 2. Simulate complex robotic environments with Gazebo and Unity. Utilize NVIDIA Isaac Sim for advanced robotics simulation and development. Understand and apply Visual Language Models (VLAs) in robotic perception and control. Analyze and contribute to humanoid robot development challenges. Evaluate hardware requirements for various robotics projects. Assess the performance and capabilities of AI-driven physical systems. ${err.message}` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    // Don't clear sessionId to maintain continuity
  };

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearChat,
  };
};

export default useChatbot;