import React from 'react';

export default function AboutSection() {
  return (
    <div className='border border-gray-200'>
    <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-12 bg-gray-100">
      {/* Left Side Image */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src="/about.png" // ⬅️ Replace with correct filename if different
          alt="About"
          className="max-w-[400px] rounded-2xl shadow-lg w-full h-auto object-cover mx-auto"
        />
      </div>

      {/* Right Side Description */}
      <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About Us</h2>
        <p className="text-gray-600 text-lg">
          Welcome to our platform! We are dedicated to providing high-quality content and services to our users. Our team works tirelessly to innovate and improve your experience every day.
        </p>
      </div>
    </div>
    </div>
  );
}
