import { FaShippingFast, FaShieldAlt, FaUndoAlt, FaHeadset } from "react-icons/fa";

export default function TrustSection() {
  const items = [
    {
      icon: <FaShippingFast className="text-pink-500 text-3xl" />,
      title: "Fast Delivery",
      description: "Get your products quickly with our express shipping options.",
    },
    {
      icon: <FaShieldAlt className="text-pink-500 text-3xl" />,
      title: "Secure Payment",
      description: "Your transactions are encrypted and 100% safe with us.",
    },
    {
      icon: <FaUndoAlt className="text-pink-500 text-3xl" />,
      title: "Easy Returns",
      description: "No-hassle returns within 7 days for eligible products.",
    },
    {
      icon: <FaHeadset className="text-pink-500 text-3xl" />,
      title: "24/7 Support",
      description: "We're here to help any time, any day.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Why Shop With Us?
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
          Enjoy a smooth and secure shopping experience backed by our promise of quality and support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center animate-fade-in">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
