import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../src/components/loader";
import ProductCard from "../../src/components/productcard";
import ImageSlider from "../../src/components/imageSlider";

export default function ProductOverview() {
    const params= useParams();
    if(params.id== null) {
         window.location.href = "/product"
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //LOADED ERROR

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
                <div className="w-full h-full flex"> 
                     <div className="w-[50%] h-full">
                        <ImageSlider image={product.image}/>
                        
                    </div>
                    <div className="w-[50%] h-full bg-green-900">
                        
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