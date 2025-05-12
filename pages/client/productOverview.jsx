import { useState } from "react";
import { useParams } from "react-router-dom"

export default function ProductOverview() {
    const params= useParams();
    if(params.id== null) {
         window.location.href = "/product"
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //LOADED ERROR

    
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1>Product Overview</h1>
        </div>
    )
} 