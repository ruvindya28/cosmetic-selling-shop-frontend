import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductsPage from "./client/productsPage";

export default function HomePage() {
    return (
        <div className="w-full h-screen max-h-screen">
           <Header/>
        
        <div className="w-full h-[calc(100vh-75px)] border-[5px]">
            <Routes path="/*">
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/products" element={<ProductsPage/>} />
            <Route path="/*" element={<h1>404 Not found</h1>} />
            </Routes>
        </div>
        </div>
    )
    }