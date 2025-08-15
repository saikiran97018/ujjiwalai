import React from 'react';

const Section = ({ id, title, subtitle, children, className = "" }) => {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;