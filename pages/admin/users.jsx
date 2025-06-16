import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Loader from "../../src/components/loader";

export function Users() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/admin/all", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setUsers(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                    toast.error("Failed to fetch users.");
                });
        }
    }, [loaded]);

    async function deleteUser(id) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first to delete user");
            return;
        }

        try {
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/user/" + id, {
                headers: { Authorization: "Bearer " + token },
            });
            setLoaded(false);
            toast.success("User deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("User delete failed");
        }
    }

    return (
        <div className="w-full px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">👥 User Management</h1>

            {loaded ? (
                <div className="overflow-x-auto rounded-xl shadow-md bg-white border border-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                            <tr>
                                <th className="px-5 py-3">ID</th>
                                <th className="px-5 py-3">First Name</th>
                                <th className="px-5 py-3">Last Name</th>
                                <th className="px-5 py-3">Email</th>
                                <th className="px-5 py-3">Role</th>
                                <th className="px-5 py-3 text-center">Verified</th>
                                <th className="px-5 py-3 text-center">Disabled</th>
                                <th className="px-5 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-5 py-3 text-gray-800 font-mono">{user._id}</td>
                                    <td className="px-5 py-3 text-gray-700">{user.firstName}</td>
                                    <td className="px-5 py-3 text-gray-700">{user.lastName}</td>
                                    <td className="px-5 py-3 text-gray-700">{user.email}</td>
                                    <td className="px-5 py-3 text-gray-700 capitalize">{user.role}</td>
                                    <td className="px-5 py-3 text-center">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                user.isEmailVerified
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {user.isEmailVerified ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <span
                                            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                user.isDisabled
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {user.isDisabled ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="inline-flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-xs font-medium shadow-sm transition"
                                        >
                                            <FaTrash className="text-xs" />
                                            Delete
                                        </button>
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
