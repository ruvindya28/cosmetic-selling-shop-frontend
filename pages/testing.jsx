
import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../src/utils/mediaUpload";



export default function Testing() {
    const [file,setFile]=useState(null);

    

    function handleUpload(){
         mediaUpload(file).then(
            (url)=>{
                 console.log(url);
                 toast.success("File Uploaded Successfully")
              }
         ).catch(
             (error)=>{
                 console.log(error);
                 toast.error("File not uploaded")
             }
             
         )
        }
    
    
   return(
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <input type="file" onChange={
            (e)=>{
                setFile(e.target.files[0])
            }
        } />
        <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
    </div>
   )
    
}