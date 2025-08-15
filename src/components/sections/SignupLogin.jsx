import React from 'react';
import Section from '../layout/Section';

const SignupLogin = () => {
  return (
    <Section className="bg-white" title="Get Started" subtitle="Create an account to unlock the full potential of UjjwalAI">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-8">Sign In</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="your@email.com" />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input type="password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-secondary">Forgot your password?</a>
              </div>
            </div>
            
            <button className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg shadow transition duration-300">
              Sign In
            </button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i className="fab fa-google text-blue-500"></i>
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i className="fab fa-microsoft text-blue-600"></i>
                </a>
              </div>
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i className="fab fa-apple text-gray-800"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-primary text-white p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-center mb-8">Create Account</h3>
          <form className="space-y-6">
            <div>
              <label className="block mb-2">Full Name</label>
              <input type="text" className="w-full px-4 py-3 bg-indigo-700 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-300" placeholder="John Doe" />
            </div>
            
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 bg-indigo-700 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-300" placeholder="your@email.com" />
            </div>
            
            <div>
              <label className="block mb-2">Password</label>
              <input type="password" className="w-full px-4 py-3 bg-indigo-700 border border-indigo-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-indigo-300" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
              <label htmlFor="terms" className="ml-2 block text-sm">I agree to the <a href="#" className="font-medium underline">Terms & Conditions</a></label>
            </div>
            
            <button className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg shadow hover:bg-gray-100 transition duration-300">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default SignupLogin;