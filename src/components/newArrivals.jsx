import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { addToCart, getCart } from "../utils/cart";
import { FaS } from "react-icons/fa6";

export default function NewArrivals() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/new-arrivals")
        .then((response) => {
            setProducts(response.data.products || []);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message || "Something went wrong");
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-12 text-center text-gray-700">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-6 py-12 text-center text-red-700">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 text-center text-gray-700">
            <h2>New Arrivals</h2>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product.id || product.productId} 
                        className="bg-white rounded-xl overflow-hidden shadow-md">
                        <Link to={`/overview/${product.productId}`}>
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <p className="text-gray-600">{product.productId}</p>
                                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            </div>
                            </Link>
                            <button
                            onClick={()=>{
                                addToCart(product, 1);
                                toast.success("Product added to cart");
                                console.log(getCart());
                            }}
                            className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
                            >
                                <FaShoppingCart />
                            </button>
                            
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}


