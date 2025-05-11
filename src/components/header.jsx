import { Link } from "react-router-dom";


export default function Header() {
    return (  
        <header className="h-[70px] w-full flex justify-center items-center">
            <div className="w-[500px] h-full flex items-center justify-evenly text-pink-400 text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/reviews">Reviews</Link>
        </div>
    </header>
    )
}