import { Link, Route, Routes, useNavigate } from "react-router-dom";
import {FaUsers} from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";   
import { FaFileInvoice } from "react-icons/fa";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrders from "./admin/adminOrders";
import Loader from "../src/components/loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminPage() {

    const[userVlidated, setUserValidated]=useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("Please login to access admin page");
            navigate("/login");
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current",
                 {headers: {
                    Authorization: "Bearer " + token,
                }}).then((response) => {
                      console.log(response.data);
                      if(response.data.user.role === "admin"){
                         setUserValidated(true);
                      }else{
                        toast.error("You are not an admin")
                        navigate("/login");
                      }
            }).catch(
                ()=>{
                    toast.error("Something went wrong please login");
                    navigate("/login");
                }
            )
        }
        
        },[]);

    return (
        
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {userVlidated ? (
                <>
           <div className="h-full w-[300px]">
           <Link to="/admin/users" className="flex items-center p-2 border"><FaUsers className="mr-2"/>Users</Link>
           <Link to="/admin/products" className="flex items-center p-2 border"><MdWarehouse className="mr-2"/>Products</Link>
           <Link to="/admin/orders" className="flex items-center p-2 border"><FaFileInvoice className="mr-2"/>Orders</Link>
           </div>
         
           
           <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">
            <Routes path="/*" >
                <Route path="/users" element={<h1>Users</h1>}/>
                <Route path="/products" element={<AdminProductsPage />}/>
                <Route path="/orders" element={<AdminOrders/>}/>
                <Route path="/addProduct" element={<AddProductForm/>}/>
                <Route path="/editProduct" element={<EditProductForm/>}/>
            </Routes>
           </div>
                </>) : (
                   <Loader/>
                )
}
        </div>
    )
}