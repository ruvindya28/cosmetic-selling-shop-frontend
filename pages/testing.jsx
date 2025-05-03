import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function Testing() {
    const [file,setFile]=useState(null);


    //https://lfoqcfuszjqbdufhjyqn.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb3FjZnVzempxYmR1ZmhqeXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTA3MzksImV4cCI6MjA2MTg2NjczOX0.cYpnrKlC823DipXrUjy_MKaoiPo1nNU8I5728029ODg
    const superbase = createClient("https://lfoqcfuszjqbdufhjyqn.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb3FjZnVzempxYmR1ZmhqeXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTA3MzksImV4cCI6MjA2MTg2NjczOX0.cYpnrKlC823DipXrUjy_MKaoiPo1nNU8I5728029ODg")

    function handleUpload(){
        
    }
    
   return(
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <input type="file" onChange={
            (e)=>{
                setFile(e.target.files(0))
            }
        } />
        <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
    </div>
   )
    
}