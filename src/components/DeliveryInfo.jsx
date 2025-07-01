import React from 'react';

const DeliveryInfo = () => {
  return (
    <section className="bg-white min-h-screen py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-6">Delivery Information</h1>
        <p className="text-center text-gray-600 mb-10">
          We’re committed to getting your beauty essentials to you safely and quickly.
        </p>

        <div className="bg-white p-6 rounded-2xl shadow space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
          
          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">📦 Processing Time</h2>
            <p>All orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed the next business day.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">🚚 Shipping Time</h2>
            <p>Delivery usually takes 3–5 business days depending on your location. You’ll receive tracking information as soon as your order ships.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">🌍 Delivery Coverage</h2>
            <p>We currently deliver to all major cities and towns across the country. For remote areas, additional time may be required.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">💸 Shipping Charges</h2>
            <p>Free delivery on all orders over $50! Orders below this amount may incur a standard shipping fee based on your location.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">❗ Delays & Exceptions</h2>
            <p>We do our best to deliver on time. However, occasional delays due to weather, holidays, or courier issues may occur. We’ll always keep you informed.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-600 mb-2">📞 Need Help?</h2>
            <p>If you have any questions about your delivery, feel free to contact our support team via live chat or email at <a href="mailto:support@cosmobeauty.com" className="text-pink-500 underline">support@cosmobeauty.com</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
