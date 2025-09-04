import React, { useState } from "react";
import Section from "../layout/Section";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../actions/api";


const ChangePassword = () => {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api + "/changepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("OTP sent to your email (valid 5 min)");
        setStep(2);
      } else {
        toast.error(data.message || "Error sending OTP");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    // Instead of local check, go directly to step 3 (final check is on backend)
    if (otp.length === 6) {
      setStep(3);
    } else {
      toast.error("Enter a valid 6-digit OTP");
    }
  };

  // Step 3: Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api + "/changepassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully");
        navigate("/signin");
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <Section
      className="bg-white"
      title="Change Password"
      subtitle="Reset your account password with OTP verification"
    >
      <div className="flex items-center justify-center">
        <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-8">Change Password</h3>

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow transition duration-300">
                Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              <div>
                <label className="block text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow transition duration-300">
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow transition duration-300">
                Change Password
              </button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ChangePassword;
