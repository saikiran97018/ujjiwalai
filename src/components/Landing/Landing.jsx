import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Features from "../sections/Features";
import Demo from "../sections/Demo";
import Testimonials from "../sections/Testimonials";
import Pricing from "../sections/Pricing";
import Contact from "../sections/Contact";
import FAQ from "../sections/FAQ";
import ChatBot from "../bot/ChatBot";
import DocumentBot from "../bot/DocumentBot";
import ScrollToTopButton from "../ui/ScrollToTopButton";
import { api } from "../actions/api";

function LandingPage() {
  const [isInfoBotOpen, setIsInfoBotOpen] = useState(false);
  const [isDocumentBotOpen, setIsDocumentBotOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // ref + state to track bot height
  const botRef = useRef(null);
  const [botHeight, setBotHeight] = useState(0);

  useEffect(() => {
    if (botRef.current) {
      setBotHeight(botRef.current.offsetHeight);
    } else {
      setBotHeight(0); // reset when closed
    }
  }, [isInfoBotOpen, isDocumentBotOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await fetch(`${api}/users/${id}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [id]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setUser(null);
      alert("You have been logged out successfully!");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar
        user={user}
        onGetStarted={() => setIsDocumentBotOpen(true)}
        onLogout={handleLogout}
      />
      <div style={{ height: 56 }} /> {/* Spacer for fixed navbar */}

      <Hero style={{ paddingTop: "44px" }} user={user} />
      <About />
      <Features />
      <Demo />
      <Testimonials user={user} />
      <Pricing />
      <Contact user={user} />
      <FAQ />
      <Footer />

      {/* ChatBot Toggle Button */}
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

      {/* Info ChatBot */}
      {isInfoBotOpen && (
        <div
          ref={botRef}
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

      {/* Document Bot */}
      {isDocumentBotOpen && (
        <div
          ref={botRef}
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

      {/* Scroll Button moves dynamically */}
      <ScrollToTopButton
        style={{
          position: "fixed",
          bottom: isInfoBotOpen || isDocumentBotOpen ? botHeight + 120 : 30,
          right: 30,
          transition: "bottom 0.3s ease",
          zIndex: 1000,
        }}
      />
    </>
  );
}

export default LandingPage;
