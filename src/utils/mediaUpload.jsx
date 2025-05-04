import { createClient } from "@supabase/supabase-js";

 const superbase = createClient(
    "https://lfoqcfuszjqbdufhjyqn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxmb3FjZnVzempxYmR1ZmhqeXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyOTA3MzksImV4cCI6MjA2MTg2NjczOX0.cYpnrKlC823DipXrUjy_MKaoiPo1nNU8I5728029ODg")

export default function mediaUpload(file) {
    const promise=new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("No file selected");
            }
            const timeStamp= new Date().getTime();
            const newFileName = timeStamp + file.name;


            superbase.storage.from("images").upload(newFileName,file,{
                cacheControl:"3600",
                upsert:false,
            }).then(
                ()=>{
                    
                    const url=superbase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                    resolve(url);
                }
            ).catch(
                (error)=>{
                    console.log(error);
                    reject("File not uploaded");
                }
            )
        }
    )
return promise
}