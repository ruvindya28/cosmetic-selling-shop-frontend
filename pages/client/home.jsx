import BestSellers from "../../src/components/bestSellers";
import Carousel from "../../src/components/carousel";
import NewArrivals from "../../src/components/newArrivals";
import TrustSection from "../../src/components/trustSection";


export default function Home() {
    return (
        <div>
            <Carousel  />
            <NewArrivals />
            <BestSellers />
            <TrustSection/>
        </div>
    )
}