import React, { useState } from 'react';
import Section from '../layout/Section';

const languageOptions = [
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Gujarati",
  "Urdu", "Kannada", "Odia", "Punjabi", "Malayalam"
];

const initialHistory = [
  { user: false, text: "Hello! I'm UjjwalAI. I can help you understand this document about artificial intelligence. What would you like to know?" },
  { user: true, text: "What is reinforcement learning?" },
  { user: false, text: "Reinforcement learning is a type of machine learning where an agent learns to make decisions by performing actions and receiving rewards or penalties. It's inspired by behavioral psychology and is particularly useful for training AI in complex environments." }
];

const suggestedQuestions = [
  "What is reinforcement learning?",
  "List the key challenges in AI",
  "Explain neural networks"
];

const Demo = () => {
  const [language, setLanguage] = useState("English");
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState(initialHistory);
  const [pdfStatus, setPdfStatus] = useState("processed"); // "uploading", "processed" etc...

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setChatHistory(prev => [...prev, { user: true, text: question }]);
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          user: false,
          text:
            question.toLowerCase().includes("concepts") ?
            `Based on the context, it appears that the concepts mentioned are related to Artificial Intelligence, Machine Learning, and Frontend Development.
Some of the specific concepts mentioned include:
1. Generative AI (GANs, GPT, Transformer Models)
2. Machine Learning (Supervised & Unsupervised)
3. Deep Learning (CNNs, RNNs, Transformers)
4. Computer Vision (Image Processing, Object Detection, Classification)
5. Natural Language Processing (NLP)` :
            "This is an automated response. For a real AI answer, integrate your backend.",
        }
      ]);
      setQuestion('');
    }, 1000);
  };

  return (
    <Section id="demo" className="bg-demo-section" title="Try It Live" subtitle="Experience UjjwalAI with our sample document">
      <div className="demo-card">
        {/* Top Dropdown & PDF Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            style={{ marginBottom: "1rem", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            {languageOptions.map(lang => (
              <option value={lang} key={lang}>{lang}</option>
            ))}
          </select>
          <div>
            {pdfStatus === "uploading" && (
              <div style={{ color: "#fbbf24" }}>
                <span role="img" aria-label="uploading">🟧</span> Uploading PDF...
              </div>
            )}
            {pdfStatus === "processed" && (
              <div style={{ color: "#22c55e" }}>
                <span role="img" aria-label="processed">✅</span> PDF processed successfully
              </div>
            )}
          </div>
        </div>

        <div className="grid" style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
          {/* Left/Sample Document and Questions */}
          <div style={{ borderRight:"1px solid #eee", padding:"2rem" }}>
            <h3>Sample Document</h3>
            <p style={{ color: "#666" }}>"Artificial Intelligence: A Modern Approach" Chapter Summary</p>
            <button style={{ background:"#e0e7ff", color:"#3730a3", borderRadius:"6px", padding:"0.5rem 1rem", marginBottom:"1rem", border:"none" }}>
              View Full Document
            </button>
            <div style={{ background:"#f1f5f9", padding:"1rem", borderRadius:"8px", marginBottom:"1rem" }}>
              <strong>Suggested Questions:</strong>
              <div style={{ marginTop:"0.5rem" }}>
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    style={{
                      fontSize: "0.9rem",
                      background: "#fff",
                      border: "1px solid #ddd",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "6px",
                      marginRight: "0.5rem",
                      marginBottom: "0.5rem",
                      cursor: "pointer"
                    }}
                    onClick={() => setQuestion(q)}
                  >{q}</button>
                ))}
              </div>
            </div>
            <form onSubmit={handleAskQuestion}>
              <textarea
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="Ask anything about the document..."
                style={{ width: "100%", height: "90px", padding: "0.75rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}
              />
              <button type="submit"
                style={{
                  background: "#6366f1",
                  color: "white",
                  padding: "0.75rem 2rem",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: "600",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.1)",
                  cursor: "pointer"
                }}>
                Ask Question
              </button>
            </form>
          </div>
          {/* Right/Chat Area */}
          <div style={{ background:"#1e293b", color:"white", padding:"2rem" }}>
            <h3 style={{ marginBottom:"1rem" }}>UjjwalAI Response</h3>
            <div style={{
              background:"#202530",
              borderRadius:"8px",
              padding:"1rem",
              minHeight:"200px",
              maxHeight:"350px",
              overflowY:"auto"
            }}>
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    background: msg.user ? "#6366f1" : "#f1f5f9",
                    color: msg.user ? "white" : "#222",
                    borderRadius: "20px",
                    padding: "12px 16px",
                    maxWidth: "80%",
                    marginBottom: "18px",
                    marginLeft: msg.user ? "auto" : "0"
                  }}
                >
                  <p style={{ margin: 0 }}>{msg.text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop:"1rem", display:"flex", gap:"1rem" }}>
              <button style={{ background:"none", color:"#818cf8", border:"none", cursor:"pointer" }}>
                <i className="fas fa-volume-up" style={{marginRight:"6px"}}></i>Read Aloud
              </button>
              <button style={{ background:"none", color:"#818cf8", border:"none", cursor:"pointer" }}>
                <i className="fas fa-copy" style={{marginRight:"6px"}}></i>Copy
              </button>
              <button style={{ background:"none", color:"#818cf8", border:"none", cursor:"pointer" }}>
                <i className="fas fa-save" style={{marginRight:"6px"}}></i>Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Demo;
