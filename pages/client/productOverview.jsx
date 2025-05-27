import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../src/components/loader";
import ProductCard from "../../src/components/productcard";
import ImageSlider from "../../src/components/imageSlider";
import { addToCart } from "../../src/utils/cart";

export default function ProductOverview() {
    const params= useParams();
    if(params.id== null) {
         window.location.href = "/product"
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); 
    const navigate= useNavigate();//LOADED ERROR

    useEffect(()=>{
        if(status == "loading"){
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product/"+params.id).then((res)=>{
          console.log(res)
          setProduct(res.data.product)
          setStatus("loaded");
    }).catch(
        ()=>{
            toast.error("product is not available");
            setStatus("error");

        }
    )
}
    },[status])


    return (
        <div className="w-full h-full">
            {
                status == "loading"&& <Loader/>
            }
            {
                status == "loaded" && 
                <div className="w-full h-full flex-col"> 
                     <div className="w-full h-full">
                        <ImageSlider image={product.image}/>
                        
                    </div>
                    <div className="w-[50%] h-full p-[40px]">{"  "}
                        <h1 className="text-3xl font-bold text-center mb-[40px]">{product.name}{"   "}
                            <span className="text-3xl font-semibolt text-center text-gray-500 mr-[20px]">{product.altNames.join(" | ")}</span></h1>
                        <div className="w-full flex justify-center mb-[40px] ">
                            {
                                product.labeledPrice > product.price?
                             <>
                             <h2 className="text-2xl mr-[20px]">LKR:{product.price.toFixed(2)}</h2>
                             <h2 className="text-2xl line-through text-gray-500">LKR:{product.labeledPrice.toFixed(2)}</h2>
                             
                             </>:
                             <h2>{product.price}</h2>   
                            }
                        </div>
                        <h2 className="text-3xl font-semibolt text-center text-gray-500">LKR:{product.price}</h2>
                        <p className="text-xl text-center text-gray-500 mb-[40px]">{product.description}</p>
                        <div className="w-full flex justify-center mb-[40px]">
                            <button className="bg-pink-500 hover:bg-white border border-pink-800 cursor-pointer text-white hover:text-pink-500 font-bold py-2 px-4 rounded mr-[20px]"
                            onClick={
                                ()=>{
                                    addToCart(product,1);
                                    toast.success("Product added to cart");
                                }
                            }
                            >Add to Cart</button>

                            <button
                             onClick={() => 
                             {
                                navigate("/checkout", { 
                                    state: { 
                                        items: [
                                            {
                                                productId: product._id,
                                                name: product.name,
                                                altNames: product.altNames,
                                                price: product.price,
                                                labeledPrice: product.labeledPrice,
                                                image: product.image[0],
                                                quantity: 1
                                            }
                                        ] 
                                        } 
                                    })
                                }} className="bg-pink-500 hover:bg-white border border-pink-800 cursor-pointer text-white hover:text-pink-500 font-bold py-2 px-4 rounded">Buy Now</button>

                        </div>
                    </div>
             </div>
            }
            {
                status == "error" && <div>
                    Error
                    </div>
            }
                 
            
        </div>
    )
} 
