import React from 'react';

const RazorpayPayment = ({ plan, onSuccess }) => {
  const handlePayment = async () => {
    try {
      // Call your backend to create an order
      const response = await fetch('http://localhost:8080/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: plan.price * 100, currency: 'INR' }), // convert ₹ to paise
      });
      const data = await response.json();

      if (!data.success) {
        alert('Unable to create order, please try again.');
        return;
      }

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key
        amount: plan.price * 100,
        currency: 'INR',
        name: 'Your App Name',
        description: `${plan.title} subscription`,
        order_id: data.orderId,
        handler: async function (response) {
          // Verify payment on backend
          const verifyResponse = await fetch('http://localhost:8080/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verifyResult = await verifyResponse.json();

          if (verifyResult.success) {
            alert('Payment successful! Subscription activated.');
            if (onSuccess) onSuccess();
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        method: {
          upi: true, // Enables PhonePe and other UPI options
          card: true,
          netbanking: true,
          wallet: true,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again later.');
    }
  };

  return (
    <button
      className="w-full bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg transition"
      onClick={handlePayment}
    >
      Subscribe to {plan.title}
    </button>
  );
};

export default RazorpayPayment;
