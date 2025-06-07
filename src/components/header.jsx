import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";


export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (  
        <header className="h-[70px] w-full flex justify-start items-center bg-gray-100 relative">
             <GiHamburgerMenu className="lg:hidden text-3xl text-pink-400 mx-4 "/>
            <div className="hidden lg:flex w-[500px] h-full items-center justify-evenly text-pink-400  text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/cart" className="absolute right-[30px] text-3xl"><BsCart4/></Link>
        </div>
        {
              isOpen &&(
                <div className="fixed top-0 left-0 bg-black w-full h-screen">
                </div>
              )
        }
       
    </header>
    )
}