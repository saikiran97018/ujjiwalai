import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, rememberMe);
    onClose();
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here (e.g., redirect or open modal)
    alert('Forgot password functionality coming soon!');
  };

  const handleGoogleLogin = () => {
    // Add your Google authentication logic here
    alert('Google login functionality coming soon!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 font-bold text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Remember Me</span>
            </label>
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-primary text-white font-medium hover:bg-secondary transition mb-3"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-sm text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          type="button"
          className="w-full py-2 rounded-lg border flex items-center justify-center font-medium bg-white text-gray-700 hover:bg-gray-50 transition"
          onClick={handleGoogleLogin}
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
