import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import "./ChatBot.css";

const languages = {
  English: "en", Hindi: "hi", Bengali: "bn", Telugu: "te", Marathi: "mr",
  Tamil: "ta", Gujarati: "gu", Urdu: "ur", Kannada: "kn", Odia: "or",
  Punjabi: "pa", Malayalam: "ml"
};

// FontAwesome robot icon
const RobotIcon = () => (
  <i className="fa-solid fa-robot" style={{ fontSize: 22, marginRight: 8 }}></i>
);

export default function ChatBot({ onClose }) {
  const [language, setLanguage] = useState("English");
  const [chatHistory, setChatHistory] = useState([
    { text: "🤖 Hello! I'm UjjwalAI. What would you like to know about Artificial Intelligence?", sender: "ai" }
  ]);
  const [userInput, setUserInput] = useState("");
  const chatRef = useRef();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    document.body.classList.toggle('dark', darkMode);
    return () => { document.body.classList.remove('dark'); };
  }, [chatHistory, darkMode]);

  const addMessage = (text, sender) => {
    setChatHistory(prev => [...prev, { text, sender }]);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;
    const message = userInput.trim();
    addMessage(message, "user");
    setUserInput("");

    setTimeout(() => {
      let reply = message.toLowerCase().includes("reinforcement learning") ?
        "Reinforcement learning is a type of machine learning where an agent learns by interacting with its environment and receiving feedback as rewards or penalties." :
        "Sorry, I do not have an answer to that question yet.";
      addMessage(reply, "ai");
    }, 900);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClearChat = () => setChatHistory([]);

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        {/* FontAwesome robot icon + app name */}
        <span><RobotIcon /> InteractPDF.AI</span>
        <div>
          {/* Language selector */}
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            aria-label="Select Language"
          >
            {Object.keys(languages).map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          {/* Dark mode toggle */}
          <button onClick={() => setDarkMode(d => !d)} title="Toggle Dark Mode">
            <i className={`fa-solid fa-moon${darkMode ? " fa-beat" : ""}`}></i>
          </button>
          {/* Clear chat */}
          <button onClick={handleClearChat} title="Clear Chat">
            <i className="fa-solid fa-trash"></i>
          </button>
          {/* Close chat */}
          <button onClick={onClose} title="Close Bot">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </header>
      <div className="chat-context">
        Context: <input type="number" value="5" min="1" max="20" style={{ width: 50 }} disabled />
      </div>
      <div className="chat-history" id="chat-history" ref={chatRef}>
        {chatHistory.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender}`}
            dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
          />
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          className="chat-input"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type or speak..."
        />
        <button
          id="send-btn"
          onClick={sendMessage}
          title="Send message"
          disabled={!userInput.trim()}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
