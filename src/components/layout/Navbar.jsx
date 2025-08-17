import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import LoginModal from "../ui/LoginModal";

const Navbar = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`bg-white ${isScrolled ? "shadow-md" : "shadow-sm"} fixed w-full z-50 transition-shadow duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-white"></i>
            </div>
            <span className="ml-2 text-xl font-bold text-primary">UjjwalAI</span>
          </div>
          <div className="hidden md:ml-10 md:flex md:space-x-8">
            <Link to="features" spy smooth offset={-70} duration={500}
              className="nav-link relative text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium cursor-pointer">
              Features
            </Link>
            <Link to="demo" spy smooth offset={-70} duration={500}
              className="nav-link relative text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium cursor-pointer">
              Demo
            </Link>
            <Link to="testimonials" spy smooth offset={-70} duration={500}
              className="nav-link relative text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium cursor-pointer">
              Testimonials
            </Link>
            <Link to="pricing" spy smooth offset={-70} duration={500}
              className="nav-link relative text-gray-500 hover:text-primary px-3 py-2 text-sm font-medium cursor-pointer">
              Pricing
            </Link>
          </div>
          <div className="flex items-center">
            <button
              className="ml-4 px-4 py-2 text-sm font-medium rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition"
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
            <button
              className="ml-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary transition"
              onClick={onGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      {/* Optional: your LoginModal logic */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={() => {}} />
    </nav>
  );
};

export default Navbar;
