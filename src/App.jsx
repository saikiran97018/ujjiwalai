import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Features from "./components/sections/Features";
import SignupLogin from "./components/sections/SignupLogin";
import Demo from "./components/sections/Demo";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import Contact from "./components/sections/Contact";
import FAQ from "./components/sections/FAQ";
import ChatBot from "./components/bot/ChatBot";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Your content sections */}
      <Hero />
      <About />
      <Features />
      <SignupLogin />
      <Demo />
      <Testimonials />
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />

      {/* Floating Chat Icon Button */}
      <button
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label={isChatOpen ? "Close ChatBot" : "Open ChatBot"}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#6366f1",
          border: "none",
          color: "white",
          fontSize: "30px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          userSelect: "none",
        }}
      >
        💬
      </button>

      {/* ChatBot popup */}
      {isChatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 30,
            zIndex: 1200,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}
        >
          <ChatBot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </>
  );
}

export default App;
