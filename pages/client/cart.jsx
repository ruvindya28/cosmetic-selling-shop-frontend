import { TbTrash } from "react-icons/tb";
import { addToCart, getCart, getTotal, getTotalLabeledPrice, removeFromCart } from "../../src/utils/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(cartLoaded == false){
        const cart = getCart();
        setCart(cart);
        setCartLoaded(true);
        }
    }, [cartLoaded]);

    return (
        <div className="w-full h-screen flex justify-center items-center bg-amber-50">
            <div className="w-[700px]">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full relative h-[100px] bg-white shadow-2xl my-[5px] flex items-center justify-between px-4">
                                 <button className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer" 
                                onClick={() => {
                                       removeFromCart(item.productId)
                                       setCartLoaded(false);
                                    }}>
                                    <TbTrash/>
                                 </button>
                                <img src={item.image} className="h-full aspect-square object-cover" />
                                
                                <div className="flex-1 px-4 overflow-hidden">
                                    <h1 className="text-xl font-bold truncate">{item.name}</h1>
                                    <h2 className="text-lg text-gray-500 truncate">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg text-gray-500">LKR:{item.price.toFixed(2)}</h2>
                                </div>

                                <div className="h-full w-[100px] flex flex-col justify-center items-center text-center">
                                    <button  className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mb-[2px]"
                                    onClick={()=>
                                    {
                                       addToCart(item,-1); 
                                       setCartLoaded(false);
                                    }
                                    }>-</button>
                                    <h1 className="text-xl font-bold">{item.quantity}</h1>
                                    <button className="text-2xl w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center cursor-pointer mb-[2px]"
                                    onClick={()=>{
                                        addToCart(item,1);
                                        setCartLoaded(false);
                                    
                                    }}>+</button>
                                    
                                </div>

                                <div className="h-full w-[100px] flex justify-center items-center text-xl font-semibold">
                                  <h1 className="text-xl w-full text-end pr-2"> {(item.price * item.quantity).toFixed(2)}</h1> 
                                </div>
                            </div>
                        );
                    })
                }
                <div className="w-full flex justify-end">
                       <h1 className="w-[100px]  text-end text-xl pr-2">Total</h1>
                       <h1 className="w-[100px]  text-end text-xl pr-2">{getTotalLabeledPrice().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                       <h1 className="w-[100px]  text-end text-xl pr-2">Discount</h1>
                       <h1 className="w-[100px]  text-end text-xl border-b-[2px] pr-2">{(getTotalLabeledPrice() - getTotal()).toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end">
                       <h1 className="w-[100px]  text-end text-xl pr-2">Net total</h1>
                       <h1 className="w-[100px]  text-end text-xl pr-2 border-b-[4px] border-double ">{getTotal().toFixed(2)}</h1>
                </div>
                <div className="w-full flex justify-end mt-4">
                    <button className="w-[170px] text-xl text-center shadow pr-2 cursor-pointer text-white h-[40px] bg-pink-400 rounded-lg"
                    onClick={() =>{

                     window.location.href = "/checkout"}}>Checkout</button>
                </div>
            </div>
        </div>
    );
}
