import AboutSection from "../../src/components/about";
import Carousel from "../../src/components/carousel";
import Footer from "../../src/components/footer";

export default function Home() {
    return (
        <div>
            <Carousel  />
            <AboutSection/>
            <Footer/>
        </div>
    )
}