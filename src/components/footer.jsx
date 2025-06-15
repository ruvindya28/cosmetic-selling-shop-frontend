import { Link } from 'react-router-dom';

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "About Us", "Contact Us", "FAQs"]
    },
    {
      title: "Need Help?",
      links: ["Delivery Information", "Return & Refund Policy", "Payment Methods", "Track your Order", "Contact Us"]
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"]
    }
  ];

  const linkMap = {
    "Home": "/",
    "Best Sellers": "/best-sellers",
    "About Us": "/about",
    "Contact Us": "/contact",
    "FAQs": "/faqs",
    "Delivery Information": "/delivery",
    "Return & Refund Policy": "/returns",
    "Payment Methods": "/payments",
    "Track your Order": "/track-order",
    // External Links
    "Instagram": "https://instagram.com/yourpage",
    "Twitter": "https://twitter.com/yourpage",
    "Facebook": "https://facebook.com/yourpage",
    "YouTube": "https://youtube.com/yourpage"
  };

  const isExternal = (url) => url.startsWith("http");

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-pink-50">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <h1 className="text-2xl font-bold text-pink-500 pl-10">
            <Link to="/">CRYSTAL BEAUTY</Link>
          </h1>
          <p className="max-w-[410px] mt-6">
            Crystal Beauty offers a wide range of skincare and makeup products for all skin types.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => {
                  const path = linkMap[link] || "#";
                  return (
                    <li key={i}>
                      {isExternal(path) ? (
                        <a href={path} target="_blank" rel="noopener noreferrer" className="hover:underline transition">
                          {link}
                        </a>
                      ) : (
                        <Link to={path} className="hover:underline transition">
                          {link}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © Crystal Beauty. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
