import React from 'react';

export default function  FAQPage() {
    

  const faqs = [
    {
      question: "What skin types are your products suitable for?",
      answer:
        "Our products are dermatologically tested and suitable for all skin types, including sensitive skin.",
    },
    {
      question: "Are your products cruelty-free?",
      answer:
        "Yes! We are 100% cruelty-free and do not test any of our products on animals.",
    },
    {
      question: "How long will it take to receive my order?",
      answer:
        "Delivery usually takes 3-5 business days. You’ll receive tracking details via email once your order ships.",
    },
    {
      question: "Can I return a product if it doesn’t suit me?",
      answer:
        "Yes, we offer a 7-day easy return policy for unused and unopened products.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "We offer free shipping on orders above $50. Below that, a small fee may apply depending on your location.",
    },
  ];

  return (
    <section className="bg-white min-h-screen py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-black mb-8">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Got questions? We’re here to help with answers to the most common inquiries about our beauty & skincare products.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-pink-600 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


