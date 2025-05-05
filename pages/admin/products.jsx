import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../src/components/loader";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                .then((response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setLoaded(true);
                    
                      }
                  )
              }
           }
      ,[loaded]
)
  

    async function deleteProduct(id){
        const token=localStorage.getItem("token");
        if(token==null){
            toast.error("Please login to delete a product")
            return
        }

        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/product/"+id,{
                headers: {
                    Authorization: "Bearer " + token

                }
            })

            setLoaded(false);
            toast.success("Product deleted successfully")

        }
        catch(error){
            console.log(error);
            toast.error("Error deleting product")
        }
       
    }

    return (
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addProduct"} className="bg-gray-600 text-white p-[12px] text-2xl rounded-full cursor-pointer hover:bg-gray-700 hover:text-white absolute bottom-5 right-5">
            <FaPlus />
            </Link>
            {loaded&&<table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Actions</th>
                      


                    </tr>
                </thead>
                <tbody>
                {
                products.map((product, index) => {
                    return (
                        <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 hover:text-black">
                            <td className="p-2">{product.productId}</td>
                            <td className="p-2">{product.name}</td>
                            <td className="p-2">{product.price}</td>
                            <td className="p-2">{product.labeledPrice}</td>
                            <td className="p-2">{product.stock}</td>
                            <td className="p-2">
                                <div className="w-full h-full flex justify-center">
                                <RiDeleteBin6Line onClick={()=>
                                    deleteProduct(product.productId)
                                    } className="text-[25px] m-[10px] hover:text-red-500" />
                                <GrEdit onClick={
                                    ()=>{
                                        //load edit product form
                                        navigate("/admin/editProduct/",{
                                            state:product
                                        }
                                        )
                                }}
                                
                                className="text-[25px] m-[10px] hover:text-blue-500" />
                                </div>
                            </td>
                            
                        </tr>
                    );
                })
            }

                </tbody>
            </table>}
            {
                !loaded&&
               <Loader/>
            }
            
        </div>
    )

}

