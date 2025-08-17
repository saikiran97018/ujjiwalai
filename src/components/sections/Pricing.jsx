import React from 'react';
import Section from '../layout/Section';
import PricingCard from '../ui/PricingCard';
import RazorpayPayment from '../ui/RazorpaySubscription';

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

  const plans = [
    { id: 'free', title: 'Free', price: 0, features: freeFeatures, buttonText: 'Get Started', buttonVariant: 'gray' },
    { id: 'pro', title: 'Pro', price: 12, popular: true, features: proFeatures },
    { id: 'enterprise', title: 'Enterprise', price: 'Custom', features: enterpriseFeatures, buttonText: 'Contact Sales', buttonVariant: 'gray' }
  ];

  const handleSubscriptionSuccess = () => {
    // You can add logic after successful subscription/payment here
  };

  return (
    <Section id="pricing" className="bg-gray-50" title="Simple, Transparent Pricing" subtitle="Choose the plan that works best for you. All plans include our core features.">
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            popular={plan.popular}
            buttonVariant={plan.buttonVariant}
          >
            {
              plan.price === 0 || plan.price === 'Custom' ? (
                <button className={`w-full ${plan.buttonVariant === 'primary' ? 'bg-primary hover:bg-secondary' : 'bg-gray-800 hover:bg-gray-900'} text-white font-medium py-3 px-6 rounded-lg transition`}>
                  {plan.buttonText || 'Get Started'}
                </button>
              ) : (
                <RazorpayPayment plan={plan} onSuccess={handleSubscriptionSuccess} />
              )
            }
          </PricingCard>
        ))}
      </div>
    </Section>
  );
};

export default Pricing;
