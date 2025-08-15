import React, { useState } from 'react';
import Section from '../layout/Section';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does UjjwalAI handle my document privacy?",
      answer: "We take privacy seriously. All documents are processed with end-to-end encryption, and we never store your data longer than necessary. You can delete documents at any time, and they're permanently removed from our servers."
    },
    {
      question: "What file types does UjjwalAI support?",
      answer: "We support PDF, DOCX, PPTX, TXT, and CSV files. Our system can extract text from scanned documents using OCR technology as well."
    },
    {
      question: "How accurate are the answers from UjjwalAI?",
      answer: "Our AI achieves over 95% accuracy on standard documents. Accuracy depends on document quality and question complexity. We continuously improve our models based on user feedback."
    },
    {
      question: "Can I use UjjwalAI with team members?",
      answer: "Yes! Our Pro and Enterprise plans include team collaboration features. You can share documents, conversations, and insights with team members in real-time."
    },
    {
      question: "Is there a mobile app for UjjwalAI?",
      answer: "Currently, UjjwalAI is available as a web application that works on all devices. We're developing native iOS and Android apps that will be released later this year."
    }
  ];

  return (
    <Section className="bg-gray-50" title="Frequently Asked Questions" subtitle="Everything you need to know about UjjwalAI">
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-6 text-left bg-white"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'} text-primary`}></i>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-6 bg-white">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FAQ;