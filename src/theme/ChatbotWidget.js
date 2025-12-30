import React, { useState, useEffect, useRef } from "react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I am your AI assistant for Physical AI & Humanoid Robotics. Ask me anything.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hello! 👋 Thank you for your interest in the Physical AI & Humanoid Robotics textbook. This book is a graduate-level resource designed to provide a comprehensive understanding of embodied intelligence, humanoid robot design, and integration of advanced AI systems into physical agents. You will explore core topics including: The fundamentals of Physical AI, perception, and sensor integration; Humanoid robotics, covering locomotion, manipulation, and control; High-fidelity simulation pipelines using platforms like Unity and NVIDIA Omniverse; ROS2 and robotics middleware for real-world system implementation; Integration of visual-language models for perception, reasoning, and interaction; Ethical and safe AI design principles for robotics applications. Each chapter is structured to build knowledge step by step, providing theoretical foundations, practical examples, and simulation-based exercises to develop hands-on skills. Whether you are a student, researcher, or practitioner, this book aims to bridge the gap between theory and real-world robotics systems. 📘 Physical AI & Humanoid Robotics equips learners to understand, design, and implement complex AI-driven robotic systems, from fundamentals to advanced real-world applications.",   },
      ]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hello again! Ask questions about Physical AI & Humanoid Robotics.",
      },
    ]);
  };

  // new neon theme
  const bg = "#020617";
  const glass = "rgba(255,255,255,0.06)";
  const neon1 = "#8b5cff";
  const neon2 = "#5deaff";

  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 9999 }}>
      {isOpen ? (
        <div
          style={{
            width: 420,
            height: 560,
            borderRadius: 22,
            background: bg,
            border: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: "0 0 50px rgba(93,234,255,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              padding: "14px 18px",
              background: `linear-gradient(135deg, ${neon1}, ${neon2})`,
              color: "black",
              fontWeight: 800,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>🤖 Humanoid AI Assistant</span>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={clearChat}
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                }}
              >
                🗑
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.4)",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* MESSAGES */}
          <div
            style={{
              flex: 1,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              overflowY: "auto",
              background:
                "radial-gradient(circle at top, rgba(93,234,255,0.15), transparent)",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "12px 14px",
                  borderRadius: 18,
                  color: "white",
                  background:
                    m.role === "user"
                      ? `linear-gradient(135deg, ${neon1}, ${neon2})`
                      : glass,
                  border:
                    m.role === "assistant"
                      ? "1px solid rgba(255,255,255,0.15)"
                      : "none",
                  boxShadow:
                    m.role === "user"
                      ? "0 0 20px rgba(93,234,255,0.3)"
                      : "none",
                }}
              >
                {m.content}
              </div>
            ))}

            {/* typing indicator */}
            {isTyping && (
              <div
                style={{
                  background: glass,
                  borderRadius: 16,
                  padding: "10px 14px",
                  width: 90,
                  color: "white",
                }}
              >
                <span>● ● ●</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div
            style={{
              padding: 12,
              display: "flex",
              gap: 8,
              background: "rgba(0,0,0,0.4)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything about course…"
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              style={{
                padding: "10px 16px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontWeight: 700,
                background: `linear-gradient(135deg, ${neon1}, ${neon2})`,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: 68,
            height: 68,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: 26,
            background: `linear-gradient(135deg, ${neon1}, ${neon2})`,
            boxShadow: "0 0 30px rgba(93,234,255,0.4)",
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}
