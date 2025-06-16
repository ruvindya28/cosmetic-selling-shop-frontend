import { useState } from "react";

export default function ForgetPasswords() {

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("email-input"); //email-sent //opt-input //password-reset
    

    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <span></span>
            <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h1>
                <p className="text-gray-600 mb-6">Enter your email to reset your password.</p>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                            onClick={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Send Reset Link
                    </button>
                </form>
        </div>
            
        </div>
    );
}
