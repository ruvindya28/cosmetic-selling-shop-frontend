import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state.items);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function placeOrder() {
    const orderData = {
      name,
      address,
      phoneNumber,
      billItems: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    const token = localStorage.getItem("token");
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(orderData),
    })
      .then(() => {
        toast.success("Order placed successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error placing order");
      });
  }

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function getTotalLabeledPrice() {
    return cart.reduce(
      (total, item) => total + item.labeledPrice * item.quantity,
      0
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-pink-600 border-b pb-4">
          Checkout
        </h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border p-4 rounded-lg"
            >
              <img
                src={item.image}
                className="w-24 h-24 object-cover rounded-md border"
                alt={item.name}
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.altNames?.join(" | ")}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  LKR {item.price.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const updatedCart = cart.map((product, i) =>
                      i === index
                        ? {
                            ...product,
                            quantity:
                              product.quantity > 1
                                ? product.quantity - 1
                                : 1,
                          }
                        : product
                    );
                    setCart(updatedCart);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  onClick={() => {
                    const updatedCart = cart.map((product, i) =>
                      i === index
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                    );
                    setCart(updatedCart);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-lg font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="w-24 text-end font-medium text-gray-700">
                {(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => {
                  const updatedCart = cart.filter(
                    (product) => product.productId !== item.productId
                  );
                  setCart(updatedCart);
                }}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              >
                <TbTrash size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-1 text-right pr-2">
          <div className="flex justify-end gap-6 text-gray-800 text-lg">
            <span className="w-40">Total:</span>
            <span>LKR {getTotalLabeledPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-6 text-green-600 text-lg">
            <span className="w-40">Discount:</span>
            <span>- LKR {(getTotalLabeledPrice() - getTotal()).toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-6 text-xl font-semibold pt-2 border-t">
            <span className="w-40">Net Total:</span>
            <span>LKR {getTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Billing Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 text-gray-800"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 text-gray-800"
              placeholder="+94xxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mt-1 text-gray-800"
              placeholder="Delivery address"
            />
          </div>
        </div>

        {/* Checkout Button */}
        <div className="text-right pt-4">
          <button
            onClick={placeOrder}
            className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition text-lg font-medium cursor-pointer"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
