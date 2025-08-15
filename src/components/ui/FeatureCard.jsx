import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card bg-white p-8 rounded-xl border border-gray-200 transition-all duration-300">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
        <i className={`${icon} text-primary text-xl`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;