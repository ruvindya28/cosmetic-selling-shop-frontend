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
    <div className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
