import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import mediaUpload from "../../src/utils/mediaUpload";


export default function EditProductForm() {
    const locationData = useLocation();
    const navigate=useNavigate();
    if (locationData.state == null) {
        toast.error("Please select a product to edit");
        window.location.href = "/admin/products";
        
    }
    const [productId,setProductId]=useState(locationData.state.productId);
    const [name,setName]=useState(locationData.state.name);
    const [altNames,setAltNames]=useState( locationData.state.altNames.join(","));
    const [price,setPrice]=useState(locationData.state.price);
    const [labeledPrice,setLabeledPrice]=useState( locationData.state.labeledPrice);
    const [description,setDescription]=useState(locationData.state.description);
    const [stock,setStock]=useState(locationData.state.stock);
    const [image,setImage]=useState([]);
   
    async function handleSubmit(){
        
        const promisesArray=[]
        for(let i=0;i<image.length;i++){
           const promise=mediaUpload(image[i]);
           promisesArray[i]=promise;
        }

        try{

        let result = await Promise.all(promisesArray);

        if(image.length==0){
            result=locationData.state.image;
        }
        
    
        const altNamesInArray=altNames.split(",")
        const product={
            name:name,
            altNames:altNamesInArray,
            price:price,
            labeledPrice:labeledPrice,
            description:description,
            stock:stock,
            image:result
        }

        const token=localStorage.getItem("token");
        console.log(token);  
        
        await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/"+productId, product, {
            headers: {
              "Authorization": "Bearer " + token
            }
          });
        toast.success("Product updated successfully")
        navigate("/admin/products");
        
    }catch(error){
        console.log(error);
        toast.error("File updating failed")
    }
    }
    
    return (
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[600px] h-[700px] rounded-lg shadow-lg flex flex-col items-center p-10 relative">
                <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Product</h1>

                <input 
                    disabled
                    value={productId}
                    onChange={(e)=>{
                        setProductId(e.target.value);
                    }
                }
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Product ID" 
                />
                <input 
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Product Name" 
                />
                <input
                    value={altNames}
                    onChange={(e)=>{
                        setAltNames(e.target.value);
                    }} 
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Alternate Names" 
                />
                <input 
                    value={price}
                    onChange={(e)=>{
                        setPrice(e.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Price" 
                />
                <input 
                    value={labeledPrice}
                    onChange={(e)=>{
                        setLabeledPrice(e.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Labelled Price" 
                />
                <textarea
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Description" 
                />
                <input
                type="file"
                onChange={(e)=>{
                    setImage(e.target.files);

                }}
                multiple
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                placeholder="Images"
                />
                          
                
                 <input 
                    value={stock}
                    onChange={(e)=>{
                        setStock(e.target.value);
                    }}
                    type="number"
                    className="w-[400px] h-[50px] border border-gray-500 rounded-xl text-center m-[5px]" 
                    placeholder="Stock" 
                />
                <div className="w-[400px] h-[100px] flex justify-between items-center">
                    <Link 
                        to="/admin/products" 
                        className="bg-red-500 text-white p-[10px] w-[200px] text-center rounded-lg cursor-pointer hover:bg-red-600 hover:text-white"
                    >
                        Cancel
                    </Link>
                    <button onClick={handleSubmit} className="bg-green-500 text-white p-[10px] w-[200px] ml-[10px] text-center rounded-lg cursor-pointer hover:bg-green-600 hover:text-white">
                        Edit Product</button>
                </div>
            </div>
        </div>
    );
}



//https://lfoqcfuszjqbdufhjyqn.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb3FjZnVzempxYmR1ZmhqeXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTA3MzksImV4cCI6MjA2MTg2NjczOX0.cYpnrKlC823DipXrUjy_MKaoiPo1nNU8I5728029ODg