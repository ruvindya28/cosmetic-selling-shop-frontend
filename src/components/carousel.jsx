import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = ["/h2.jpg", "/h1.jpg", "/h3.jpg"]; // Update paths as needed

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-white">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full h-[500px] flex-shrink-0 flex items-center justify-center p-4 bg-white relative"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl shadow-lg transition-opacity duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
      >
        <FaChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100 transition"
      >
        <FaChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white scale-110" : "bg-gray-400"
            } transition transform`}
          />
        ))}
      </div>
    </div>
  );
}
