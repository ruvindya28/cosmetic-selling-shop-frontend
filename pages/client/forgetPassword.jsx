import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgetPasswords() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendMail(e) {
        e.preventDefault(); // prevent form reload

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail", {
            email: email
        }).then((response) => {
            console.log(response.data);
            setEmailSent(true);
            toast.success("Email sent successfully! Please check your inbox.");
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to send email. Please try again.");
        });
    }

    function changePassword(e) {
        e.preventDefault(); // prevent form reload

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/changePassword", {
            email: email,
            otp: otp,
            password: password
        }).then((response) => {
            console.log(response.data);
            toast.success("Password reset successfully!");
            window.location.href = "/login"; // Redirect to login page after successful password reset
            // You can also use a router if you're using React Router, e.g., `use
            // Optionally reset the form
            setEmail("");
            setOtp("");
            setPassword("");
            setConfirmPassword("");
            setEmailSent(false);
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to reset password. Please try again.");
            //reload page
            window.location.reload();
        });
    }

    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <ToastContainer />
            {
                emailSent ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <form
                            onSubmit={changePassword}
                            className="bg-white p-4 rounded shadow-md w-[400px]"
                        >
                            <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>

                            <div className="mb-4">
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    placeholder="Enter the OTP sent to your email"
                                    required
                                    onChange={(e) => setOtp(e.target.value)}
                                    value={otp}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    placeholder="Enter your new password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    placeholder="Confirm your new password"
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="w-full h-full flex-1 flex items-center justify-center">
                        <form
                            onSubmit={sendMail}
                            className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6"
                        >
                            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h1>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Send OTP
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}
