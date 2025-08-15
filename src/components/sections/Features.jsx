import React from 'react';
import Section from '../layout/Section';
import FeatureCard from '../ui/FeatureCard';

const Features = () => {
  const features = [
    {
      icon: "fas fa-file-pdf",
      title: "PDF Upload & Analysis",
      description: "Upload any PDF document and get instant insights with our advanced document processing technology."
    },
    {
      icon: "fas fa-comments",
      title: "Natural Language Q&A",
      description: "Ask questions in plain English and get accurate answers extracted directly from your documents."
    },
    {
      icon: "fas fa-language",
      title: "Multilingual Support",
      description: "Interact with documents in over 20 languages. Ask questions in any language and get answers."
    },
    {
      icon: "fas fa-volume-up",
      title: "Text-to-Speech",
      description: "Listen to document content and answers with natural-sounding voices in multiple languages."
    },
    {
      icon: "fas fa-history",
      title: "Chat History",
      description: "Save and revisit your conversations. Never lose important insights from your documents."
    },
    {
      icon: "fas fa-video",
      title: "Video Suggestions",
      description: "Get relevant video recommendations based on your document content for deeper understanding."
    },
    {
      icon: "fas fa-file-contract",
      title: "Summarization",
      description: "Generate concise summaries of long documents with key points highlighted for quick review."
    },
    {
      icon: "fas fa-lock",
      title: "Secure & Private",
      description: "Enterprise-grade security with encryption at rest and in transit. Your documents are always private."
    },
    {
      icon: "fas fa-bolt",
      title: "Instant Results",
      description: "Get answers in seconds, not hours. Our AI processes documents at lightning speed."
    }
  ];

  return (
    <Section id="features" className="bg-gray-50" title="Powerful Features" subtitle="Everything you need to extract maximum value from your documents">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </Section>
  );
};

export default Features;