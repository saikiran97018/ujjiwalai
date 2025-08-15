import React from 'react';

const TestimonialCard = ({ stars, quote, initials, name, position }) => {
  return (
    <div className="testimonial-card bg-gray-50 p-8 rounded-xl border border-gray-200">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-400"></i>
        ))}
      </div>
      <p className="text-gray-600 mb-6">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-indigo-700 font-bold">{initials}</span>
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-gray-500">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;