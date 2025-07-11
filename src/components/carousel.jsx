import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = ["/h2.jpg", "/h1.jpg", "/h3.jpg"];

const captions = [
  {
    title: "Glow with Confidence",
    description: "Discover premium skincare products for radiant beauty.",
  },
  {
    title: "Enhance Your Natural Beauty",
    description: "Explore our exclusive makeup collection crafted for you.",
  },
  {
    title: "Luxury Meets Care",
    description: "Indulge in high-quality cosmetics that pamper your skin.",
  },
];

export default function ImageCarousel() {
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
    <div className="w-full flex justify-center px-8 pt-8"> {/* Increased padding */}
      <div className="relative w-full max-w-7.2xl h-[500px] overflow-hidden bg-black rounded-xl shadow-2xl select-none">
        <h2 className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-white drop-shadow-lg z-10">
          Beauty Moments
        </h2>

        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0 flex items-center justify-center relative group"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 rounded-xl"></div>
              {index === current && (
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/2 bg-white/20 backdrop-blur-md text-white text-center px-6 py-5 rounded-xl shadow-lg z-10">
                  <h3 className="text-2xl font-semibold mb-2">
                    {captions[index].title}
                  </h3>
                  <p className="text-md">{captions[index].description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 backdrop-blur p-3 rounded-full shadow hover:bg-white/50 transition z-20"
        >
          <FaChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 backdrop-blur p-3 rounded-full shadow hover:bg-white/50 transition z-20"
        >
          <FaChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 rounded-full transition-transform duration-300 ${
                index === current
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/60 hover:bg-white scale-100"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
