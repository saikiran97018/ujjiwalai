import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import "./DocumentBot.css";

const languages = {
  English: "en",
  Hindi: "hi",
  Bengali: "bn",
  Telugu: "te",
  Marathi: "mr",
  Tamil: "ta",
  Gujarati: "gu",
  Urdu: "ur",
  Kannada: "kn",
  Odia: "or",
  Punjabi: "pa",
  Malayalam: "ml",
};

export default function DocumentBot({ onClose }) {
  const [language, setLanguage] = useState("English");
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [lastAIResponse, setLastAIResponse] = useState("");
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatHistory.length === 0) addMessage("🤖 Welcome to InteractPDF.AI!", "ai");
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatHistory]);

  // Add F11 close handler
  useEffect(() => {
    const handleF11 = (e) => {
      if (e.key === "F11") {
        e.preventDefault();
        if (typeof onClose === "function") onClose();
      }
    };
    window.addEventListener("keydown", handleF11);
    return () => window.removeEventListener("keydown", handleF11);
  }, [onClose]);

  const addMessage = (text, sender = "user") => {
    setChatHistory((prev) => [...prev, { text, sender }]);
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;
    addMessage(userInput, "user");
    setUserInput("");
    fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: userInput,
        language,
        max_history: 5,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLastAIResponse(data.answer);
        addMessage(data.answer, "ai");
      });
  };

  const uploadPDFs = (e) => {
    const files = e.target.files;
    if (!files.length) return;
    addMessage("📁 Uploading PDF...", "ai");
    const fd = new FormData();
    for (let f of files) fd.append("pdfs", f);
    fetch("/upload_pdf", { method: "POST", body: fd })
      .then((res) => res.json())
      .then((d) => addMessage(d.message || "Uploaded", "ai"));
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files.length) return;
    addMessage("📁 Uploading PDF...", "ai");
    const fd = new FormData();
    for (let f of files) fd.append("pdfs", f);
    fetch("/upload_pdf", { method: "POST", body: fd })
      .then((res) => res.json())
      .then((d) => addMessage(d.message, "ai"));
  };

  const dragOverHandler = (e) => e.preventDefault();

  const playLastAnswer = () => {
    if (!lastAIResponse) return;
    fetch("/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lastAIResponse, lang_code: languages[language] }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.audio) {
          const audio = new Audio("data:audio/mp3;base64," + data.audio);
          audio.play();
        }
      });
  };

  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice not supported");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (e) => setUserInput(e.results[0].transcript);
  };

  const clearChat = () => {
    setChatHistory([]);
    fetch("/clear", { method: "POST" });
  };

  const toggleDark = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="container" onDrop={dropHandler} onDragOver={dragOverHandler}>
      <header>
        <span>
          <i className="fas fa-robot" aria-hidden="true"></i> InteractPDF.AI
        </span>
        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select Language"
          >
            {Object.keys(languages).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <button onClick={toggleDark} title="Toggle Dark Mode" aria-label="Toggle Dark Mode">
            🌙
          </button>
          <button onClick={clearChat} title="Clear Chat" aria-label="Clear Chat">
            🗑
          </button>
          <button onClick={onClose} title="Close Bot" aria-label="Close Bot">
            ✖
          </button>
        </div>
      </header>

      <div style={{ padding: 5, textAlign: "center", fontSize: 12 }}>
        Context:{" "}
        <input
          type="number"
          value={5}
          min={1}
          max={20}
          readOnly
          style={{ width: 50, marginLeft: 4 }}
          aria-label="Maximum conversation history context"
        />
      </div>

      <div id="chat-history" ref={chatRef}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender}`}
            dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
          />
        ))}
      </div>

      <div className="input-section">
        <input
          type="file"
          multiple
          accept=".pdf"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={uploadPDFs}
          aria-hidden="true"
        />

        <button
          className="icon-btn"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          title="Upload PDF"
          aria-label="Upload PDF"
        >
          <i className="fas fa-file-upload" aria-hidden="true"></i>
        </button>

        <button className="icon-btn" onClick={startVoiceInput} title="Speak" aria-label="Start Voice Input">
          <i className="fas fa-microphone" aria-hidden="true"></i>
        </button>

        <input
          type="text"
          placeholder="Type or speak..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          aria-label="Message input"
        />

        <button className="icon-btn" onClick={playLastAnswer} title="Read Reply" aria-label="Play Text-To-Speech">
          <i className="fas fa-volume-up" aria-hidden="true"></i>
        </button>

        <button id="send-btn" onClick={sendMessage} aria-label="Send message">
          <i className="fas fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
