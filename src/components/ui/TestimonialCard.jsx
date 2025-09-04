import React from 'react';

const TestimonialCard = ({ quote, initials, name, position, rating }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Star Rating */}
      {rating && (
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}
      
      {/* Quote */}
      <p className="text-gray-700 italic mb-6 leading-relaxed">
        "{quote}"
      </p>
      
      {/* Author Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {initials}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;