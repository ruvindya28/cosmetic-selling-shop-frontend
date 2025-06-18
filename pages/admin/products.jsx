import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../src/components/loader";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                .then((response) => {
                    setProducts(response.data);
                    setLoaded(true);
                });
        }
    }, [loaded]);

    async function deleteProduct(id) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to delete a product");
            return;
        }

        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/" + id, {
                headers: { Authorization: "Bearer " + token }
            });
            setLoaded(false);
            toast.success("Product deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error deleting product");
        }
    }

    return (
        <div className="w-full h-full p-6 relative bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🛍️ Product Management</h2>

            {/* Add Product Floating Button */}
            <Link
                to="/admin/addProduct"
                className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white text-xl p-4 rounded-full shadow-lg transition duration-300 z-10"
                title="Add Product"
            >
                <FaPlus />
            </Link>

            {/* Product Table */}
            {loaded ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-sm text-left border border-gray-200 rounded-lg overflow-hidden shadow">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3">Product ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Labeled Price</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 font-mono text-gray-700">{product.productId}</td>
                                    <td className="px-4 py-3 text-gray-800">{product.name}</td>
                                    <td className="px-4 py-3 text-gray-700">LKR {product.price}</td>
                                    <td className="px-4 py-3 text-gray-700">LKR {product.labeledPrice}</td>
                                    <td className="px-4 py-3 text-gray-700">{product.stock}</td>
                                    <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                title="Delete"
                                                onClick={() => deleteProduct(product.productId)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <RiDeleteBin6Line size={20} />
                                            </button>
                                            <button
                                                title="Edit"
                                                onClick={() => navigate("/admin/editProduct/", { state: product })}
                                                className="text-blue-500 hover:text-blue-700 transition"
                                            >
                                                <GrEdit size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
