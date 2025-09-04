import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Section from "../layout/Section";
import { api } from "../actions/api";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    if (!email || !password) {
      alert("⚠️ Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${api}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.message === "Login successful" && data.user) {
        const userData = data.user;

        alert("✅ Login Successful! Redirecting to your dashboard...");

        setTimeout(() => navigate(`/landing/${userData._id}`), 1500);
      } else {
        if (data.error === "Email not found") {
          alert("❌ Email not found. Please Sign up.");
          setTimeout(() => navigate("/signup"), 1500);
        } else if (data.error === "Incorrect password") {
          alert("❌ Incorrect password. Please try again.");
        } else {
          setErrorMsg(data.message || "Login failed. Try again.");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section
      className="bg-white"
      title="Sign In"
      subtitle="Access your UjjwalAI account"
    >
      <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-xl border border-gray-200">
        <h3 className="text-2xl font-bold text-center mb-8">Sign In</h3>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {errorMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div></div>
            <div className="text-sm">
              <Link
                to="/changepassword"
                className="font-medium text-primary hover:text-secondary"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-gray-400" : "bg-primary hover:bg-secondary"
            } text-white font-bold py-3 px-4 rounded-lg shadow transition duration-300`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-secondary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </Section>
  );
};

export default Signin;
