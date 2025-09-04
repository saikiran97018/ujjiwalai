import React, { useState } from "react";
import Section from "../layout/Section";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../actions/api";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api+"/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully");
        navigate("/signin");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <Section
      className="bg-white"
      title="Join UjjwalAI"
      subtitle="Create an account to unlock the full potential"
    >
      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2 bg-primary text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-8">Create Account</h3>
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-indigo-700 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-300"
                placeholder="John Doe"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-indigo-700 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-300"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-indigo-700 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-300"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm">
                I agree to the{" "}
                <a href="#" className="font-medium underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-300">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SignUp;
