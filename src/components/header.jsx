import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-[70px] w-full bg-pink-50 shadow-md flex items-center justify-between px-6 relative">
      
      {/* Left side: logo and hamburger */}
      <div className="flex items-center gap-4">
        <GiHamburgerMenu
          className="lg:hidden text-3xl text-pink-400"
          onClick={() => setIsOpen(true)}
        />
        <h1 className="text-2xl font-bold text-pink-500 pl-10"><Link to="/">Beauty Room</Link></h1>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:flex gap-8 text-pink-500 text-lg">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/review">Reviews</Link>
      </nav>


      {/* Desktop search bar */}
      

      {/* Right side: cart and search icon (mobile) */}
      <div className="flex items-center gap-4 text-3xl text-pink-400 pr-10">
        <div className="lg:hidden">
          <FiSearch />
        </div>

        <UserData />
        {/* Cart icon */}
        <Link to="/cart">
          <BsCart4 />
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex">
          {/* Side menu (slide from left) */}
          <div className="w-[75%] max-w-[300px] bg-white h-full p-6 shadow-lg animate-slide-in-left">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-pink-500">Menu</h2>
              <IoMdClose
                className="text-2xl text-pink-500 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <nav className="flex flex-col gap-4 text-pink-600 text-lg">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
              <Link to="/review" onClick={() => setIsOpen(false)}>Reviews</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
