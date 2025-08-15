import React from 'react';
import Section from '../layout/Section';
import PricingCard from '../ui/PricingCard';

const Pricing = () => {
  const freeFeatures = [
    { text: "5 document uploads/month" },
    { text: "20 questions/month" },
    { text: "Basic summarization" },
    { text: "Multilingual support", disabled: true },
    { text: "Text-to-Speech", disabled: true },
    { text: "Video suggestions", disabled: true }
  ];

  const proFeatures = [
    { text: "Unlimited documents" },
    { text: "Unlimited questions" },
    { text: "Advanced summarization" },
    { text: "Multilingual support" },
    { text: "Text-to-Speech" },
    { text: "Video suggestions" }
  ];

  const enterpriseFeatures = [
    { text: "All Pro features" },
    { text: "Team collaboration" },
    { text: "Priority support" },
    { text: "Custom integrations" },
    { text: "Enhanced security" },
    { text: "Dedicated account manager" }
  ];

  return (
    <Section id="pricing" className="bg-gray-50" title="Simple, Transparent Pricing" subtitle="Choose the plan that works best for you. All plans include our core features.">
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <PricingCard 
          title="Free"
          price="0"
          features={freeFeatures}
          buttonText="Get Started"
          buttonVariant="gray"
        />
        
        <PricingCard 
          title="Pro"
          price="12"
          features={proFeatures}
          popular={true}
          buttonText="Get Started"
        />
        
        <PricingCard 
          title="Enterprise"
          price="Custom"
          features={enterpriseFeatures}
          buttonText="Contact Sales"
          buttonVariant="gray"
        />
      </div>
    </Section>
  );
};

export default Pricing;