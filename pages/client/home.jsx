import AboutSection from "../../src/components/about";
import Carousel from "../../src/components/carousel";
import NewArrivals from "../../src/components/newArrivals";


export default function Home() {
    return (
        <div>
            <Carousel  />
            <NewArrivals />
            <AboutSection/>
           
        </div>
    )
}