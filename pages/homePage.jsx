import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";

export default function HomePage() {
    return (
        <div className="w-full h-screen">
           <Header/>
        
        <div className="w-full h-[calc(100vh-75px)] min-h-[calc(100vh-75px)]">
            <Routes path="/*">
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/products" element={<ProductsPage/>} />
            <Route path="/overview/:id" element={<ProductOverview/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/*" element={<h1>404 Not found</h1>} />
            </Routes>
        </div>
        </div>
    )
    }