import { useEffect, useState } from "react";
import Loader from "../../src/components/loader";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                setOrders(response.data);
                setLoaded(true);
            });
        }
    }, [loaded]);

    function changeOrderStatus(orderId, status) {
        const token = localStorage.getItem("token");
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`, { status }, {
            headers: { Authorization: "Bearer " + token }
        }).then(() => {
            toast.success("Status changed successfully");
            setLoaded(false);
        });
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            {loaded ? (
                <div className="overflow-x-auto shadow-md rounded-xl bg-white p-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">📦 Orders</h1>
                    <table className="min-w-full table-auto text-sm text-left text-gray-700">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold sticky top-0">
                            <tr>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Address</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {orders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-100 transition-colors">
                                    <td className="px-4 py-2">{order.email}</td>
                                    <td className="px-4 py-2">{order.orderId}</td>
                                    <td className="px-4 py-2">{order.name}</td>
                                    <td className="px-4 py-2">{order.address}</td>
                                    <td className="px-4 py-2">{order.phoneNumber}</td>
                                    <td className="px-4 py-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) => changeOrderStatus(order.orderId, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                            <option value="Processing">Processing</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2">Rs. {order.total.toFixed(2)}</td>
                                    <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs"
                                            onClick={() => {
                                                setModelIsDisplaying(true);
                                                setDisplayingOrder(order);
                                            }}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Modal */}
                    {modelIsDisplaying && displayingOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white w-full max-w-2xl rounded-lg overflow-hidden shadow-lg relative">
                                <div className="p-6 border-b">
                                    <h2 className="text-lg font-bold">Order Details</h2>
                                    <p><strong>Order ID:</strong> {displayingOrder.orderId}</p>
                                    <p><strong>Date:</strong> {new Date(displayingOrder.date).toLocaleDateString()}</p>
                                    <p><strong>Status:</strong> {displayingOrder.status}</p>
                                    <p><strong>Total:</strong> Rs. {displayingOrder.total.toFixed(2)}</p>
                                </div>
                                <div className="p-4 max-h-[400px] overflow-y-auto">
                                    {displayingOrder.billItems.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 border p-3 rounded-md mb-3 shadow-sm">
                                            <img src={item.image} alt={item.productName} className="h-20 w-20 object-cover rounded-md" />
                                            <div>
                                                <h3 className="text-sm font-semibold">{item.productName}</h3>
                                                <p className="text-pink-500 text-sm">Price: Rs. {item.price.toFixed(2)}</p>
                                                <p className="text-pink-500 text-sm">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setModelIsDisplaying(false)}
                                    className="absolute top-3 right-3 text-gray-600 hover:text-black bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                                >
                                    <IoMdClose size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
