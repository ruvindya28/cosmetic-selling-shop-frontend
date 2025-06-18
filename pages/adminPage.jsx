import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaUsers, FaFileInvoice } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrders from "./admin/adminOrders";
import Loader from "../src/components/loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Users } from "./admin/users";
import AdminDash from "./admin/admindash";

export default function AdminPage() {
    const [userValidated, setUserValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to access admin page");
            navigate("/login");
        } else {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    if (response.data.user.role === "admin") {
                        setUserValidated(true);
                    } else {
                        toast.error("You are not an admin");
                        navigate("/login");
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong, please login");
                    navigate("/login");
                });
        }
    }, []);

    if (!userValidated) {
        return <Loader />;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Admin Panel
                </h2>
                <Link
                    to="/admin/users"
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition"
                >
                    <FaUsers className="text-xl" />
                    <span>Users</span>
                </Link>
                <Link
                    to="/admin/products"
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition"
                >
                    <MdWarehouse className="text-xl" />
                    <span>Products</span>
                </Link>
                <Link
                    to="/admin/orders"
                    className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded transition"
                >
                    <FaFileInvoice className="text-xl" />
                    <span>Orders</span>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                <div className="bg-white rounded-xl shadow p-6 min-h-full">
                    <Routes>
                        <Route path="/" element={<AdminDash />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/products" element={<AdminProductsPage />} />
                        <Route path="/orders" element={<AdminOrders />} />
                        <Route path="/addProduct" element={<AddProductForm />} />
                        <Route path="/editProduct" element={<EditProductForm />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}
