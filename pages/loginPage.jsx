import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loginWithGoogle = useGoogleLogin(
    {
      onSuccess : (res)=>{
        setLoading(true)
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/google",{
          accessToken : res.access_token
        }).then(
          (response)=>{
             console.log("Login successfull", response.data);
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token);


                const user = response.data.user;
                if(user.role === "admin"){
                    // Redirect to admin page
                    navigate("/admin");
                } else {
                    // Redirect to home page
                    navigate("/");
                }
            setLoading(false);
          }
        )
        
      }
    }
  )
    
           

  // Manual login handler
  function handleLogin(){
        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email: email,
            password: password
        }).then(
            (response) => {
                console.log("Login successfull", response.data);
                toast.success("Login successfull");
                localStorage.setItem("token", response.data.token);


                const user = response.data.user;
                if(user.role === "admin"){
                    // Redirect to admin page
                    navigate("/admin");
                } else {
                    // Redirect to home page
                    navigate("/");
                }
            setLoading(false);

        }) .catch(
            (error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            }
        )

        console.log("Login Button Clicked");    
    }

  return (
    <div className="w-full h-screen bg-[url(/login_bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-xl shadow-xl rounded-4xl flex justify-center items-center flex-col">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-[400px] h-[50px] border border-white rounded-xl text-center m-[5px]"
          />

          <button
            onClick={handleLogin}
            className="w-[400px] h-[50px] bg-pink-600 hover:bg-pink-700 rounded-xl cursor-pointer mt-2 text-white font-semibold"
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            onClick={() => loginWithGoogle()}
            className="w-[400px] h-[50px] bg-white hover:bg-gray-100 rounded-xl cursor-pointer flex justify-center items-center mt-2 text-black font-semibold"
          >
             
            <FcGoogle className="mr-[10px] text-2xl" />
            {loading ? "Loading..." : "Login with google"}
           
          </button>

          <p className="text-gray-600 text-center m-[10px] mt-4">
            Don't have an account yet?
            &nbsp;
            <Link
              to={"/register"}
              className="text-pink-600 mt-[20px] cursor-pointer hover:text-pink-700"

            >
              Register Now
            </Link>
          </p>

          {/*forget password */}

          <p className="text-gray-600 text-center m-[10px] mt-4">
            Forgot your password?
            &nbsp;
            <span className="text-pink-600 hover:text-pink-700 mt-[20px] cursor-pointer">
            <Link
              to={"/forget"}
>
              Reset Password
            </Link>
              </span>
              </p>

        </div>
      </div>
    </div>
  );
}
  

