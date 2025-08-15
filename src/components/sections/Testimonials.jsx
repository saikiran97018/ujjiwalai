import React from 'react';
import Section from '../layout/Section';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "UjjwalAI saved me 10+ hours per week on research. The accuracy is incredible! It's like having a personal research assistant.",
      initials: "SJ",
      name: "Sarah Johnson",
      position: "Research Analyst"
    },
    {
      quote: "The multilingual support helped our global team collaborate seamlessly on documents. The summarization feature is a game-changer!",
      initials: "RP",
      name: "Raj Patel",
      position: "Product Manager"
    },
    {
      quote: "As a legal consultant, I deal with hundreds of pages daily. UjjwalAI helps me find information instantly. Worth every penny!",
      initials: "MC",
      name: "Michael Chen",
      position: "Legal Consultant"
    }
  ];

  return (
    <Section id="testimonials" className="bg-white" title="What Our Users Say" subtitle="Join thousands of professionals who have transformed how they work with documents">
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index}
            quote={testimonial.quote}
            initials={testimonial.initials}
            name={testimonial.name}
            position={testimonial.position}
          />
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;