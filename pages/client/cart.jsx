import { TbTrash } from "react-icons/tb";
import { addToCart, getCart, getTotal, getTotalLabeledPrice, removeFromCart } from "../../src/utils/cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) {
      const cart = getCart();
      setCart(cart);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-pink-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-pink-600 text-center mb-8">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-6 bg-gray-50 p-4 rounded-xl shadow-sm relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:w-24 h-24 object-cover rounded-md shadow-sm"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{item.name}</h2>
                    <p className="text-sm text-gray-500 truncate">{item.altNames.join(" | ")}</p>
                    <p className="text-base font-medium text-gray-600 mt-1">LKR {item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        addToCart(item, -1);
                        setCartLoaded(false);
                      }}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button
                      className="w-8 h-8 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        addToCart(item, 1);
                        setCartLoaded(false);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right text-lg font-semibold text-gray-700 min-w-[100px]">
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => {
                      removeFromCart(item.productId);
                      setCartLoaded(false);
                    }}
                  >
                    <TbTrash size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="mt-8 border-t pt-6 space-y-2 text-right">
              <div className="flex justify-end gap-6 text-lg">
                <span className="w-40 font-medium text-gray-700">Subtotal:</span>
                <span className="w-32">LKR {getTotalLabeledPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-6 text-lg text-green-600">
                <span className="w-40 font-medium">Discount:</span>
                <span className="w-32">- LKR {(getTotalLabeledPrice() - getTotal()).toFixed(2)}</span>
              </div>
              <div className="flex justify-end gap-6 text-xl font-bold border-t pt-4">
                <span className="w-40">Net Total:</span>
                <span className="w-32 text-gray-800">LKR {getTotal().toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { items: cart },
                  })
                }
                className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-md text-lg font-semibold transition cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
