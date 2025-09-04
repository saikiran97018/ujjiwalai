import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import { useNavigate,useParams } from "react-router-dom";
import "./DocumentBot.css";

const languages = {
  English: { code: "en", flag: "🇬🇧" },
  Hindi: { code: "hi", flag: "🇮🇳" },
  Bengali: { code: "bn", flag: "🇧🇩" },
  Telugu: { code: "te", flag: "🇮🇳" },
  Marathi: { code: "mr", flag: "🇮🇳" },
  Tamil: { code: "ta", flag: "🇮🇳" },
  Gujarati: { code: "gu", flag: "🇮🇳" },
  Urdu: { code: "ur", flag: "🇵🇰" },
  Kannada: { code: "kn", flag: "🇮🇳" },
  Odia: { code: "or", flag: "🇮🇳" },
  Punjabi: { code: "pa", flag: "🇮🇳" },
  Malayalam: { code: "ml", flag: "🇮🇳" },
};

export default function DocumentBot({ onClose }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [language, setLanguage] = useState("English");
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [lastAIResponse, setLastAIResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  const addedWelcome = useRef(false);

useEffect(() => {
  if (!addedWelcome.current) {
    addMessage("🤖 Welcome! I’m your document assistant. Ask me anything about this document.", "ai");
    addedWelcome.current = true;
  }
}, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose?.();
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [onClose]);

  const addMessage = (text, sender = "user") => {
    setChatHistory((prev) => [...prev, { text, sender }]);
  };

  const sendMessage = () => {
    if (!userInput.trim() || isProcessing) return;
    
    setIsProcessing(true);
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
      })
      .catch((error) => {
        addMessage("❌ Sorry, I encountered an error. Please try again.", "ai");
      })
      .finally(() => setIsProcessing(false));
  };

  const uploadPDFs = (e) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    setIsProcessing(true);
    addMessage(`📁 Uploading ${files.length} PDF file(s)...`, "ai");
    
    const fd = new FormData();
    for (let f of files) fd.append("pdfs", f);
    
    fetch("/upload_pdf", { method: "POST", body: fd })
      .then((res) => res.json())
      .then((d) => addMessage(d.message || "✅ PDFs uploaded successfully!", "ai"))
      .catch(() => addMessage("❌ Upload failed. Please try again.", "ai"))
      .finally(() => setIsProcessing(false));
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files.length) return;
    fileInputRef.current.files = files;
    uploadPDFs({ target: fileInputRef.current });
  };

  const playLastAnswer = () => {
    if (!lastAIResponse) return;
    
    setIsProcessing(true);
    fetch("/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        text: lastAIResponse, 
        lang_code: languages[language].code 
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.audio) {
          const audio = new Audio("data:audio/mp3;base64," + data.audio);
          audio.play();
        }
      })
      .catch(() => addMessage("❌ Audio playback failed.", "ai"))
      .finally(() => setIsProcessing(false));
  };

  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      addMessage("Your browser doesn't support voice input", "ai");
      return;
    }
    
    setIsProcessing(true);
    addMessage("🎤 Listening... Speak now", "ai");
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = languages[language].code;
    recognition.start();
    
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setUserInput(transcript);
      setIsProcessing(false);
    };
    
    recognition.onerror = () => {
      addMessage("Couldn't process voice input", "ai");
      setIsProcessing(false);
    };
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setChatHistory([]);
      fetch("/clear", { method: "POST" });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className={`document-bot-container ${darkMode ? "dark" : ""}`} 
         onDrop={dropHandler} 
         onDragOver={(e) => e.preventDefault()}>
      
      {/* Header with back button and reorganized elements */}
      <header className="header-gradient">
        <div className="header-left">
          <button 
            onClick={() => navigate(`/landing/${id}`)} 
            className="back-btn"
            title="Back to Home"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          
          <div className="logo">
            <i className="fas fa-robot"></i>
            <span>InteractPDF.AI</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="language-selector">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isProcessing}
            >
              {Object.entries(languages).map(([lang, { flag }]) => (
                <option key={lang} value={lang}>
                  {flag} {lang}
                </option>
              ))}
            </select>
          </div>
          
          <div className="header-controls">
            <button 
              onClick={toggleDarkMode} 
              className="control-btn"
              title="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            
            <button 
              onClick={clearChat} 
              className="control-btn danger"
              title="Clear Chat"
              disabled={isProcessing}
            >
              🗑️
            </button>
            
            <button 
              onClick={onClose} 
              className="control-btn close-btn"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Chat history with new background design */}
      <div className="chat-history" ref={chatRef}>
        <div className="chat-background-pattern"></div>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender} ${
              msg.sender === "ai" ? "ai-gradient" : "user-gradient"
            }`}
          >
            <div className="message-content">
              <div className="message-sender">
                {msg.sender === "ai" ? "🤖 AI Assistant" : "👤 You"}
              </div>
              <div 
                className="message-text"
                dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
              />
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="chat-message ai ai-gradient">
            <div className="message-content">
              <div className="message-sender">🤖 AI Assistant</div>
              <div className="message-text processing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input section with improved buttons and effects */}
      <div className="input-section input-gradient">
        <input
          type="file"
          multiple
          accept=".pdf"
          ref={fileInputRef}
          onChange={uploadPDFs}
          style={{ display: "none" }}
        />
        
        <div className="input-controls">
          <button
            onClick={() => fileInputRef.current.click()}
            className="action-btn upload-btn"
            title="Upload PDF"
            disabled={isProcessing}
          >
            <i className="fas fa-cloud-upload-alt"></i>
          </button>
          
          <button
            onClick={startVoiceInput}
            className={`action-btn voice-btn ${isProcessing ? "pulse" : ""}`}
            title="Voice Input"
            disabled={isProcessing}
          >
            <i className="fas fa-microphone"></i>
          </button>
          
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask something about your document..."
            disabled={isProcessing}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          
          <button
            onClick={playLastAnswer}
            className="action-btn tts-btn"
            title="Read Last Response"
            disabled={!lastAIResponse || isProcessing}
          >
            <i className="fas fa-volume-up"></i>
          </button>
          
          <button
            onClick={sendMessage}
            className="action-btn send-btn"
            disabled={!userInput.trim() || isProcessing}
          >
            {isProcessing ? (
              <i className="fas fa-circle-notch fa-spin"></i>
            ) : (
              <i className="fas fa-paper-plane"></i>
            )}
          </button>
        </div>
        
        <div className="drag-drop-hint">
          <i className="fas fa-file-import"></i> Drag & drop PDFs anywhere to upload
        </div>
      </div>
    </div>
  );
}