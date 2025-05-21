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
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            )
                .then((response) => {
                    setOrders(response.data);
                    setLoaded(true);
                });
        }
    }, [loaded]);

    function changeOrderStatus(orderId, status) {
        const token = localStorage.getItem("token");

        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, {
            status: status
        },{
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(
          ()=>{
            toast.success("Status changed successfully");
            setLoaded(false);
          }
        )
       
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            {loaded ? (
                <div className="overflow-x-auto shadow-md rounded-xl bg-white p-4">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Orders</h1>
                    <table className="min-w-full table-auto text-sm text-left text-gray-700">
  <thead className="bg-gray-200 text-gray-600 uppercase text-xs font-semibold">
    <tr>
      <th className="px-4 py-3">Customer Email</th>
      <th className="px-4 py-3">Order ID</th>
      <th className="px-4 py-3">Customer Name</th>
      <th className="px-4 py-3">Address</th>
      <th className="px-4 py-3">Phone Number</th>
      <th className="px-4 py-3">Status</th>
      <th className="px-4 py-3">Total</th>
      <th className="px-4 py-3">Date</th>
      <th className="px-4 py-3">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-300">
    {orders.map((order) => (
      <tr
        key={order.orderId}
        className="hover:bg-gray-100 transition-colors duration-150"
      >
        <td className="px-4 py-2">{order.email}</td>
        <td className="px-4 py-2">{order.orderId}</td>
        <td className="px-4 py-2">{order.name}</td>
        <td className="px-4 py-2">{order.address}</td>
        <td className="px-4 py-2">{order.phoneNumber}</td>
        <td className="px-4 py-2">
          <select
            value={order.status} className="z-[50]" onChange={
              (e) => {
                
                    changeOrderStatus(order.orderId, e.target.value);
                
              }
            }
           
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Processing">Processing</option>
          </select>
        </td>
        <td className="px-4 py-2">Rs. {order.total.toFixed(2)}</td>
        <td className="px-4 py-2">{new Date(order.date).toDateString()}</td>
        <td className="px-4 py-2">
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-xs"
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

                    {
                        modelIsDisplaying && 
                        <div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
                               <div className="w-[600px] h-[600px] max-w-[600px] max-h-[600px] bg-white relative">
                                <div className="w-full h-[150px]" >
                                    <h1 className="text-sm font-bold p-2">Order ID: {displayingOrder.orderId}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Date: {new Date(displayingOrder.date).toLocaleDateString()}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Status: {displayingOrder.status}</h1>
                                    <h1 className="text-sm font-bold p-2">Order Total: {displayingOrder.total.toFixed(2)}</h1>
                                    </div>
                                    <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                                        {
                                            displayingOrder.billItems.map((item, index) => {
                                                return(
                                                    
                                                    <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex items-center justify-between relative">
                                                         <img src={item.image} className="h-full aspect-square object-cover" />
                                                    <div className="h-full max-w-[300px] overflow-hidden">
                                                        
                                                        <h1 className="text-lg font-semi-bold">{item.productName}</h1>
                                                        <h2 className="text-lg text-pink-400">LKR: {item.price.toFixed(2)}</h2>
                                                        <h2 className="text-lg text-pink-400"> Quantity: {item.quantity}</h2>

                                                    </div>
                                                
                                                   
                                                </div>
                                                
                                                )
                                            })
                                        }
                                        
                                    </div>
                                    <button className="w-[40px] h-[40px] absolute right-[-20px] top-[-20px] rounded-full bg-white shadow shadow-black flex justify-center items-center" 
                                    onClick={() => setModelIsDisplaying(false)}>
                                    <IoMdClose />
                                </button>
                                </div>

                                
                               </div>
                               
                            
                    }
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}


//621704032952-chr33g29rviu7mmuhbfd37kp00af4sfv.apps.googleusercontent.com