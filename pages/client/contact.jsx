import React from "react";

export default function ContactPage() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // Replace with your actual Web3Forms access key
    formData.append("access_key", "160718ea-a5ec-4ec8-b52b-85375e534016");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("✅ Message sent successfully!");
      event.target.reset();
    } else {
      setResult("❌ " + data.message);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-pink-600">Get in Touch</h2>
          <p className="text-gray-600">
            We'd love to hear from you! Whether you're curious about products, feedback, or just want to chat.
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>📍 Address:</strong> 123 Beauty Lane, Glamour City</p>
            <p><strong>📞 Phone:</strong> (123) 456-7890</p>
            <p><strong>✉️ Email:</strong> contact@beautyshop.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
          >
            Send Message
          </button>

          {/* Submission result */}
          <p className="text-sm text-gray-600">{result}</p>
        </form>
      </div>

      {/* Optional Map */}
      <div className="mt-10 w-full max-w-4xl h-64 rounded-xl overflow-hidden shadow-md">
        <iframe
          title="Shop Location"
          className="w-full h-full"
          src="https://maps.google.com/maps?q=Colombo,%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
