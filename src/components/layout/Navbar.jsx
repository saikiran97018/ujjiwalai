import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";

const Navbar = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "te", label: "Telugu" },
    { code: "ta", label: "Tamil" },
    { code: "kn", label: "Kannada" },
    { code: "ml", label: "Malayalam" },
    { code: "mr", label: "Marathi" },
    { code: "gu", label: "Gujarati" },
    { code: "bn", label: "Bengali" },
    { code: "pa", label: "Punjabi" },
  ];

  // Load Google Translate script
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,te,ta,kn,ml,mr,gu,bn,pa",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    // Hide Google’s default widget UI
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate { display: none !important; }
      body { top: 0 !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
      .goog-logo-link, .goog-te-gadget { display: none !important; }
      .skiptranslate { display: none !important; }
      #google_translate_element { display: none !important; }
      .notranslate { translate: no !important; }
    `;
    document.head.appendChild(style);
  }, []);

  // Change language function
  const handleLanguageChange = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change")); // 🔑 trigger translation
    }
    setShowLangDropdown(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
        setShowLangDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`bg-white ${
        isScrolled ? "shadow-lg" : "shadow-sm"
      } fixed w-full z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <div className="bg-gradient-to-r from-primary to-secondary w-8 h-8 rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              UjjwalAI
            </span>
          </div>

          {/* Menu Links */}
          <div className="hidden md:ml-10 md:flex md:space-x-6">
            {["features", "demo", "testimonials", "pricing"].map((item) => (
              <Link
                key={item}
                to={item}
                spy
                smooth
                offset={-70}
                duration={500}
                className="relative group px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors cursor-pointer select-none"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div
            className="flex items-center space-x-4 notranslate"
            ref={dropdownRef}
          >
            {/* Translate Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="px-4 py-2 text-sm font-medium rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md cursor-pointer select-none"
              >
                🌐 Translate
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer select-none"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth/Profile Section */}
            {!user ? (
              <button
                className="px-4 py-2 text-sm font-medium rounded-md text-primary border border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-md cursor-pointer select-none"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group cursor-pointer select-none"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <img
                    src={
                      user.avatar ||
                      `https://ui-avatars.com/api/?name=${user.fullname}&background=4f46e5&color=fff`
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-primary">
                    {user.name || "User"}
                  </span>
                  <FiChevronDown
                    className={`text-gray-500 transition-transform duration-200 ${
                      showProfileDropdown ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 select-none">
                      <p className="text-sm font-medium text-gray-900">
                        {user.fullname}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer select-none"
                      onClick={() => {
                        navigate("/profile");
                        setShowProfileDropdown(false);
                      }}
                    >
                      <FiUser className="mr-3 text-gray-400" />
                      Profile Settings
                    </button>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-150 cursor-pointer select-none"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to logout?")) {
                          onLogout();
                          setShowProfileDropdown(false);
                        }
                      }}
                    >
                      <FiLogOut className="mr-3 text-red-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Hidden Google element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </nav>
  );
};

export default Navbar;
