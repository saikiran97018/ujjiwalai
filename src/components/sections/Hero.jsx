import React from "react";
import Section from "../layout/Section";
import { useNavigate } from "react-router-dom";

const Hero = ({ user }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (user && user._id) {
      // User is authenticated - navigate to chat
      navigate(`/chat/${user._id}`);
    } else {
      // No user - navigate to signin
      navigate("/signin");
    }
  };

  return (
    <Section className="hero-bg pt-32 pb-20 text-white">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Transform Your Documents <br />into Conversations
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Ask anything from your PDF. Accessible, Accurate, Instant.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleAction}
              className="px-8 py-4 bg-white text-primary font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-lg"
            >
              <i className="fas fa-upload mr-3"></i> Upload PDF
            </button>
            <button
              onClick={handleAction}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center text-lg"
            >
              <i className="fas fa-bolt mr-3"></i> Try Now
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="mascot-animation relative">
            <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
              <div className="w-56 h-56 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-spin-slow">
                <div className="w-40 h-40 bg-accent rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white text-7xl animate-bounce-slow"></i>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-ping-slow">
              <i className="fas fa-lightbulb text-white text-3xl"></i>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;