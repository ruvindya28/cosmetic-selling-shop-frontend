import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! 📨");
    // Here you could integrate with a backend or service like Formspree
    setForm({ name: "", email: "", message: "" });
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
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
