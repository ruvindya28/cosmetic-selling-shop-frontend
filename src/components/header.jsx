import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[70px] w-full bg-pink-50 shadow-md flex items-center justify-between px-6 relative">
      {/* Left: Brand Name */}
      <div className="flex items-center gap-4">
        <GiHamburgerMenu
          className="lg:hidden text-3xl text-pink-400"
          onClick={() => setIsOpen(!isOpen)}
        />
        <h1 className="text-2xl font-bold text-pink-500 ml-15">BeautyRoom</h1>
      </div>

      {/* Center: Page Links */}
      <nav className="hidden lg:flex gap-8 text-pink-500 text-lg mr-15">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/review">Reviews</Link>
      </nav>

      {/* Right: Cart Icon */}
      <div className="text-3xl text-pink-400 mr-15">
        <Link to="/cart">
          <BsCart4 />
        </Link>
      </div>

      {/* Mobile Menu Overlay (Optional) */}
      {isOpen && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-screen z-50">
          {/* You can add a mobile menu here if needed */}
        </div>
      )}
    </header>
  );
}
