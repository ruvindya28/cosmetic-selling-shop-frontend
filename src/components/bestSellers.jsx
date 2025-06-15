import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader";
import { Link } from "react-router-dom";
import { addToCart, getCart } from "../utils/cart";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/product/best-sellers")
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
    <div className="container mx-auto px-6 py-12 text-gray-800">
      <h2 className="text-3xl font-bold mb-8 text-center">🔥 Best Sellers</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No best sellers available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id || product.productId}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
            >
              <Link to={`/overview/${product.productId}`}>
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {product.productId}
                  </p>
                  <p className="text-pink-600 font-bold mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="px-4 pb-4 mt-auto">
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Product added to cart");
                    console.log(getCart());
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md transition duration-200"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
