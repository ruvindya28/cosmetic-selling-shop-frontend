import { TbTrash } from "react-icons/tb";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [cart, setCart] = useState(location.state.items);
    const [cartRefresh, setCartRefresh] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

/*
{
  "name": "Nimal",
  "email": "mni@example.com",
  "address": "123 Main, Country",
  "phoneNumber": "+12345876890",
  "billItems": [
      {
        "productId" :"SERUM058",
        "quantity" : 3
      },
      {
        "productId" :"COSM001",
        "quantity" : 3
      }
  ]
 }  
*/

function placeOrder() {
    const orderData = {
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        billItems: []
    }
    for(let i=0; i<cart.length; i++){
        orderData.billItems[i] = {
            productId: cart[i].productId,
            quantity: cart[i].quantity
        }
    }
     const token = localStorage.getItem("token");
    fetch(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
    
        headers: {
            
            Authorization: "Bearer " + token,
        },
        
    }).then(()=>{
        toast.success("Order placed successfully");
        navigate("/");
    }).catch((error)=>{
        console.log(error);
        toast.error("Error placing order");
    })  
        
}

  
    function getTotal() {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    function getTotalLabeledPrice() {
        return cart.reduce((total, item) => total + item.labeledPrice * item.quantity, 0);
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-amber-50">
            <div className="w-[700px]">
                {
                    cart.map((item, index) => (
                        <div key={item.productId} className="w-full relative h-[100px] bg-white shadow-2xl my-[5px] flex items-center justify-between px-4">
                            <button
                                className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer"
                                onClick={() => {
                                    const updatedCart = cart.filter(product => product.productId !== item.productId);
                                    setCart(updatedCart);
                                }}
                            >
                                <TbTrash />
                            </button>

                            <img src={item.image} className="h-full aspect-square object-cover" alt={item.name} />

                            <div className="flex-1 px-4 overflow-hidden">
                                <h1 className="text-xl font-bold truncate">{item.name}</h1>
                                <h2 className="text-lg text-gray-500 truncate">{item.altNames?.join(" | ")}</h2>
                                <h2 className="text-lg text-gray-500">LKR: {item.price.toFixed(2)}</h2>
                            </div>

                            <div className="h-full w-[100px] flex flex-col justify-center items-center text-center">
                                <button
                                    className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mb-[2px]"
                                    onClick={() => {
                                        const updatedCart = cart.map((product, i) => {
                                            if (i === index) {
                                                return {
                                                    ...product,
                                                    quantity: product.quantity > 1 ? product.quantity - 1 : 1
                                                };
                                            }
                                            return product;
                                        });
                                        setCart(updatedCart);
                                    }}
                                >-</button>

                                <h1 className="text-xl font-bold">{item.quantity}</h1>

                                <button
                                    className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mb-[2px]"
                                    onClick={() => {
                                        const updatedCart = cart.map((product, i) => {
                                            if (i === index) {
                                                return {
                                                    ...product,
                                                    quantity: product.quantity + 1
                                                };
                                            }
                                            return product;
                                        });
                                        setCart(updatedCart);
                                    }}
                                >+</button>
                            </div>

                            <div className="h-full w-[100px] flex justify-center items-center text-xl font-semibold">
                                <h1 className="text-xl w-full text-end pr-2">
                                    {(item.price * item.quantity).toFixed(2)}
                                </h1>
                            </div>
                        </div>
                    ))
                }

                {/* Totals */}
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end text-xl pr-2">Total</h1>
                    <h1 className="w-[100px] text-end text-xl pr-2">
                        {getTotalLabeledPrice().toFixed(2)}
                    </h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end text-xl pr-2">Discount</h1>
                    <h1 className="w-[100px] text-end text-xl border-b-[2px] pr-2">
                        {(getTotalLabeledPrice() - getTotal()).toFixed(2)}
                    </h1>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end text-xl pr-2">Net total</h1>
                    <h1 className="w-[100px] text-end text-xl pr-2 border-b-[4px] border-double">
                        {getTotal().toFixed(2)}
                    </h1>
                </div>
                  <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end text-xl pr-2">Name</h1>
                    <input className="w-[200px] text-xl border-[2px] text-end pr-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end text-xl pr-2">Phone</h1>
                    <input className="w-[200px] text-xl border-[2px] text-end pr-2"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-end text-xl pr-2">Address</h1>
                    <input className="w-[200px] text-xl border-[2px] text-end pr-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
                </div>
                

                {/* Checkout Button */}
                <div className="w-full flex justify-end mt-4">
                    <button
                        className="w-[170px] text-xl text-center shadow pr-2 cursor-pointer text-white h-[40px] bg-pink-400 rounded-lg"
                        onClick={placeOrder}
                    >Place Order</button>
                </div>
            </div>
        </div>
    );
}
