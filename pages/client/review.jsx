import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([
    {
      name: "Amaya Silva",
      rating: 5,
      message: "The lip gloss is amazing! My lips feel so smooth and shiny 💖",
    },
    {
      name: "Nimali Perera",
      rating: 4,
      message: "Love the natural face cream. Great for daily use!",
    },
  ]);

  const [form, setForm] = useState({ name: "", rating: 0, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (ratingValue) => {
    setForm((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.message) {
      alert("Please fill all fields!");
      return;
    }
    setReviews((prev) => [form, ...prev]);
    setForm({ name: "", rating: 0, message: "" });
  };

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Customer Reviews
        </h2>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-10 space-y-4"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your review..."
            rows={3}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer text-2xl ${
                  form.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
          >
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-pink-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-pink-600">{review.name}</h4>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
