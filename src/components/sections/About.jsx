import React from 'react';
import Section from '../layout/Section';

const About = () => {
  return (
    <Section className="bg-white" title="About UjjwalAI" subtitle="Our mission is to make document interaction as natural as conversation using cutting-edge AI technology.">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-bullseye text-white text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600">To revolutionize how people interact with documents by making information extraction as simple as having a conversation.</p>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-cogs text-white text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">How It Works</h3>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Upload your document</li>
            <li>Ask questions in natural language</li>
            <li>Get instant, accurate answers</li>
            <li>Save and share your insights</li>
          </ol>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-globe text-white text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold mb-4">Global Support</h3>
          <p className="text-gray-600 mb-4">Supported Languages:</p>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">English</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Spanish</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">French</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">German</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Hindi</span>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Japanese</span>
          </div>
          <p className="text-gray-600">Document Types: PDF, DOCX, PPTX, TXT, CSV</p>
        </div>
      </div>
    </Section>
  );
};

export default About;