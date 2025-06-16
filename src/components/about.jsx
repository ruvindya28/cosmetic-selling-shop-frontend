export default function AboutSection() {
  return (
    <div className="flex items-center justify-center py-12 px-4 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        
        {/* Left Side Image */}
        <div className="md:w-1/2 w-full flex items-center justify-center p-6 bg-pink-100">
          <img
            src="/about1.jpg" // Replace if needed
            alt="About"
            className="w-[300px] h-auto rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Right Side Description */}
         <div className="md:w-1/2 w-full p-10 md:p-14 flex flex-col justify-center bg-pink-200">
          <h2 className="text-4xl font-bold text-pink-700 mb-20">About Crystal Beauty</h2>
          <p className="text-pink-900 text-lg leading-relaxed">
            At <span className="font-semibold">Crystal Beauty</span>, we believe that beauty starts with self-love. 
            Our mission is to enhance your natural glow with high-quality cosmetics that make you feel confident and radiant every day.
            From skincare essentials to luxurious makeup, we offer products crafted with care and love.
          </p>
        </div>

      </div>
    </div>
  );
}
