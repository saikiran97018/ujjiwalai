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
import DocumentBot from "./components/bot/DocumentBot";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

function App() {
  const [isInfoBotOpen, setIsInfoBotOpen] = useState(false);
  const [isDocumentBotOpen, setIsDocumentBotOpen] = useState(false);

  return (
    <>
      <Navbar onGetStarted={() => setIsDocumentBotOpen(true)} />
      <div style={{ height: 56 }} /> {/* Spacer for fixed navbar */}

     <Hero style={{ paddingTop: "64px" }} />
      <About />
      <Features />
      <SignupLogin />
      <Demo />
      {/* <TestimonialDemo /> -- REMOVE OR COMMENT OUT THIS LINE */}
      <Testimonials />
      <Pricing />
      <Contact />
      <FAQ />
      <Footer />

      <button
        onClick={() => setIsInfoBotOpen((prev) => !prev)}
        aria-label={isInfoBotOpen ? "Close Info ChatBot" : "Open Info ChatBot"}
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
          fontSize: 30,
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

      {isInfoBotOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 30,
            zIndex: 1200,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <ChatBot onClose={() => setIsInfoBotOpen(false)} />
        </div>
      )}

      {isDocumentBotOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 30,
            zIndex: 1300,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <DocumentBot onClose={() => setIsDocumentBotOpen(false)} />
        </div>
      )}

      <ScrollToTopButton />
    </>
  );
}

export default App;
