export default function AboutSection() {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 lg:px-32">
      {/* Top Section: Title + Text (top aligned) */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* Title + Text (first 2 columns) */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-black mb-6">About Beauty Room</h1>
          <p className="text-xl text-gray-600 max-w-md p-2">
           Beauty is not just skin deep; it’s the confidence that radiates from within.
            At Beauty Room, we believe every individual’s unique story and personality 
            deserve to be celebrated. Our mission is to empower you to feel your most 
            authentic and radiant self, embracing your true beauty every single day
          </p>
          <a
            href="/contact"
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition mt-15"
          >
            Contact Us
          </a>
          <div className="mt-13">
          <div className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-pink-500 mb-2 flex items-center gap-2">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
            <li>Clean, cruelty-free ingredients</li>
            <li> Shades for every skin tone</li>
            <li> Dermatologist-tested formulas</li>
            <li> Trusted by 10,000+ happy customers</li>
          </ul>
          </div>
        </div>
        </div>

        {/* Video */}
        <div className="w-full flex justify-center">
          <div className="w-[320px] sm:w-[360px] md:w-[400px] rounded-xl overflow-hidden shadow-xl">
            <video
              className="w-full h-auto object-cover"
              controls
              autoPlay
              muted
              loop
            >
              <source src="/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
         
      </div>

      {/* Brand Story Section (placed separately after grid) */}
     <div className="mt-20 max-w-6xl mx-auto space-y-12 px-6 lg:px-0">
  <div>
    <h2 className="text-2xl font-semibold text-pink-500 mb-2 flex items-center gap-2">
      🎯 Our Mission
    </h2>
    <p className="text-gray-700 leading-relaxed">
      Our mission is to make premium-quality cosmetics accessible, inclusive, and safe for everyone. No compromises, no filters – just real beauty for real people.
    </p>
  </div>

  <div>
    <h2 className="text-2xl font-semibold text-pink-500 mb-2 flex items-center gap-2">
      📖 Our Story
    </h2>
    <p className="text-gray-700 leading-relaxed">
      CosmoBeauty began in 2020 with a single lipstick shade and a dream to create a line that celebrates uniqueness.
    </p>
  </div>

  <div>
    <h2 className="text-2xl font-semibold text-pink-500 mb-2 flex items-center gap-2">
      🤝 Our Promise
    </h2>
    <p className="text-gray-700 leading-relaxed">
      You deserve cosmetics that celebrate you. Every product is crafted with love, tested for safety, and designed to let your confidence shine.
    </p>
  </div>
</div>


    </section>
  );
}
