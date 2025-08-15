import React from 'react';

const PricingCard = ({ title, price, features, popular = false, buttonText, buttonVariant = "primary" }) => {
  return (
    <div className={`bg-white p-8 rounded-xl border ${popular ? 'border-2 border-primary shadow-lg relative' : 'border-gray-200'} text-center`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="mb-6">
        {price === "Custom" ? (
          <span className="text-4xl font-bold">Custom</span>
        ) : (
          <>
            <span className="text-4xl font-bold">${price}</span>
            <span className="text-gray-600">/month</span>
          </>
        )}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`text-gray-600 ${feature.disabled ? 'text-gray-400 line-through' : ''}`}>
            {feature.text}
          </li>
        ))}
      </ul>
      <button className={`w-full ${buttonVariant === 'primary' ? 'bg-primary hover:bg-secondary' : buttonVariant === 'gray' ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-200'} text-white font-medium py-3 px-6 rounded-lg transition`}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;