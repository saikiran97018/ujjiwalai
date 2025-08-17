import React from 'react';
import Section from '../layout/Section';

const Hero = () => {
  return (
    <Section className="hero-bg pt-32 pb-20 text-white">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Documents into Conversations</h1>
          <p className="text-xl mb-8 opacity-90">Ask anything from your PDF. Accessible, Accurate, Instant.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-100 transition flex items-center justify-center">
              <i className="fas fa-upload mr-2"></i> Upload PDF
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition flex items-center justify-center">
              <i className="fas fa-bolt mr-2"></i> Try Now
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="mascot relative">
            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-xl">
              <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center">
                <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center">
                  <i className="fas fa-robot text-white text-6xl"></i>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-lightbulb text-white text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
