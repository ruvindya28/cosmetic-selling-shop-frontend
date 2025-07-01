export default function AboutSection() {
  return (
    <section className="bg-white text-gray-800 py-16 px-6 lg:px-32">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-black mb-4">About CosmoBeauty</h1>
        <p className="text-lg text-gray-600 mb-10">
          Where beauty meets confidence. We empower every skin tone, every personality, and every story.
        </p>

        {/* Video Embed */}
        <div className="aspect-w-16 aspect-h-9 mb-12 rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="About CosmoBeauty"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Brand Story */}
        <div className="text-left space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-pink-400">Our Mission</h2>
            <p className="mt-2 text-gray-700">
              Our mission is to make premium-quality cosmetics accessible, inclusive, and safe for everyone. No compromises, no filters – just real beauty for real people.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-pink-400">Our Story</h2>
            <p className="mt-2 text-gray-700">
              CosmoBeauty began in 2020 with a single lipstick shade and a dream to create a line that celebrates uniqueness. Built by beauty lovers who were tired of unsafe ingredients and limited shade ranges, we are redefining what beauty means – one glow at a time.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-pink-400">Why Choose Us?</h2>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>🌿 Clean, cruelty-free ingredients</li>
              <li>🎨 Shades for every skin tone</li>
              <li>🧪 Dermatologist-tested formulas</li>
              <li>💖 Trusted by 10,000+ happy customers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-pink-400">Our Promise</h2>
            <p className="mt-2 text-gray-700">
              You deserve cosmetics that celebrate you. Every product is crafted with love, tested for safety, and designed to let your confidence shine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


