import { Route, Routes } from "react-router-dom";
import Header from "../src/components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import Home from "./client/home";
import ContactPage from "./client/contact";
import ReviewPage from "./client/review";
import Footer from "../src/components/footer";
import AboutSection from "../src/components/about";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />

            <div className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/about" element={<AboutSection/>} />
                    <Route path="/review" element={<ReviewPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
}
