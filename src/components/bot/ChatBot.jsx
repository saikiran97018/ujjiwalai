import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

const topics = [
  { label: "📄 Upload PDF", value: "pdf" },
  { label: "🤖 Text Q&A", value: "text" },
  { label: "🎦 Video Recommendation", value: "video" },
  { label: "🗣️ Voice to Text", value: "voice_text" },
  { label: "🔈 Text to Voice", value: "text_voice" },
];

export default function ChatBot({ onClose }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", text: "👋 Welcome! How can I assist you today?" }
  ]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userInput, setUserInput] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleTopic = (topic) => {
    setSelectedTopic(topic);
    let response = "";
    switch (topic) {
      case "pdf":
        response = "You can upload a PDF and ask any question. I'll extract text and answer based on the PDF's content.";
        break;
      case "text":
        response = "Type your questions and I'll answer instantly based on our AI-powered text generation.";
        break;
      case "video":
        response = "Get tailored video recommendations based on your queries or interests.";
        break;
      case "voice_text":
        response = "Use your voice to ask questions! I'll convert speech to text and answer accordingly.";
        break;
      case "text_voice":
        response = "Want to listen to answers? I'll convert text responses into speech for you.";
        break;
      default:
        response = "How can I assist you today?";
    }
    setChatHistory(h => [...h, { sender: "bot", text: response }]);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;
    setChatHistory(h => [...h, { sender: "user", text: userInput }]);
    setTimeout(() => {
      setChatHistory(h => [...h, { sender: "bot", text: "Thanks! I'll get back to you based on your input." }]);
    }, 800);
    setUserInput("");
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="modern-chatbot-container small-size" role="region" aria-label="Chatbot interface">
      <div className="modern-chatbot-header">
        <span className="modern-chatbot-avatar" aria-label="Chatbot logo">
          <span role="img" aria-hidden="true">🤖</span>
        </span>
        <span className="modern-chatbot-title">UjjwalAI</span>
        <button
          className="modern-chatbot-close"
          onClick={onClose}
          title="Close chatbot"
          aria-label="Close chatbot"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="modern-chatbot-status" aria-live="polite">
        <span className="modern-chatbot-status-indicator" aria-hidden="true"></span> We usually reply within 5 minutes
      </div>

      <div className="modern-chatbot-history" ref={chatRef} role="log" aria-live="polite" aria-relevant="additions">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`modern-chatbot-message ${msg.sender}`} aria-label={`${msg.sender === 'bot' ? 'Bot' : 'User'} message`}>
            {msg.text}
          </div>
        ))}
        {!selectedTopic && (
          <div className="modern-chatbot-topic-list">
            <div className="modern-chatbot-topic-label">
              Please choose one of the features below 👇
            </div>
            <div className="modern-chatbot-topics">
              {topics.map(topic => (
                <button
                  key={topic.value}
                  className="modern-chatbot-topic-btn"
                  onClick={() => handleTopic(topic.value)}
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="modern-chatbot-input-section">
        <input
          className="modern-chatbot-input"
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Type your message"
        />
        <button
          className="modern-chatbot-send"
          onClick={sendMessage}
          disabled={!userInput.trim()}
          aria-label="Send message"
          title="Send message"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
