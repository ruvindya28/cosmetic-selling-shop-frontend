import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch orders.");
      });
  }, []);

  const handleDelete = (orderId) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        <p>Are you sure you want to delete this order?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axios.delete(
                  import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
                  {
                    headers: {
                      Authorization: "Bearer " + token,
                    },
                  }
                );
                toast.success("Order deleted successfully");
                setOrders((prev) =>
                  prev.filter((order) => order.orderId !== orderId)
                );
              } catch (error) {
                console.error("Error deleting order:", error);
                toast.error("Failed to delete order.");
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded hover:bg-gray-100"
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const map = {
      pending: {
        icon: <FaClock className="text-yellow-600" />,
        classes: "bg-yellow-100 text-yellow-800",
      },
      delivered: {
        icon: <FaCheckCircle className="text-green-600" />,
        classes: "bg-green-100 text-green-700",
      },
      cancelled: {
        icon: <FaTimesCircle className="text-red-600" />,
        classes: "bg-red-100 text-red-700",
      },
    };

    const s = status?.toLowerCase();
    const { icon, classes } = map[s] || {
      icon: null,
      classes: "bg-gray-100 text-gray-700",
    };

    return (
      <span
        className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${classes}`}
      >
        {icon}
        {status || "Pending"}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            You have no orders yet.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 flex flex-col justify-between border border-gray-200"
              >
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Order #{order.orderId}
                    </h2>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                    <FaUser className="text-gray-500" />
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                    <FaPhone className="text-gray-500" />
                    <strong>Phone:</strong> {order.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <strong>Address:</strong> {order.address}
                  </p>
                  {order.date && (
                    <p className="text-sm text-gray-700 flex items-center gap-2 mb-1">
                      <FaCalendarAlt className="text-gray-500" />
                      <strong>Date:</strong> {formatDate(order.date)}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-800 mb-2">Items:</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {order.billItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-12 h-12 rounded border object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.productName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <p className="text-lg font-bold text-gray-800">
                    LKR {order.total.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleDelete(order.orderId)}
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium transition cursor-pointer"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
