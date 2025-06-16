import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswords() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendMail(){
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/sendMail",{
            email: email
        }).then((response) => {
            console.log(response.data);
            setEmailSent(true);
            toast.success("Email sent successfully! Please check your inbox.");
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to send email. Please try again.");
        })
    }


    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {
                emailSent ? 
                <div className="w-full h-full flex items-center justify-center">


                    <div className="bg-white p-4 rounded shadow-md w-[400px]">
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
                    >Reset Password</button>
                    </div>
                </div>


    :<div className="w-full h-full flex-1 flex items-center justify-center">
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h1>
                
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                            onChange={(e)=> {
                                setEmail(e.target.value);

                            }}
                            value={email}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                        onClick={sendMail}
                    >
                        Send OTP
                    </button>
                </form>
        </div>
            
        </div>
            }
        </div>
    );
}
