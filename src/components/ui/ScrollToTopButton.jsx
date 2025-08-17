import React, { useState, useEffect } from "react";

export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Your app content, replace this with your actual components */}
     

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          style={{
            position: "fixed",
            bottom: 90,
            right: 30,
            zIndex: 2000,
            background: "linear-gradient(90deg, #2e72fe 0%, #1596ff 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 45,
            height: 45,
            fontSize: 22,
            cursor: "pointer",
            boxShadow: "0 3px 14px rgba(0,0,0,0.19)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.18s, transform 0.15s",
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = "#1596ff";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.12)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = "linear-gradient(90deg, #2e72fe 0%, #1596ff 100%)";
            e.currentTarget.style.transform = "none";
          }}
        >
          &#8679;
        </button>
      )}
    </>
  );
}
