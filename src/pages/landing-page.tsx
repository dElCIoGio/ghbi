import HeroSection from "@/components/pages/landing-page/hero";
import OurStorySection from "@/components/pages/landing-page/about-us";
import RecommendedProducts from "@/components/pages/landing-page/our-products";
import StartHereSection from "@/components/pages/landing-page/start-here";
import ExploreProductsSection from "@/components/pages/landing-page/explore";
import {useGetProducts} from "@/hooks/shopify/products";


function LandingPage() {


    const {
        data = []
    } = useGetProducts()

    return (
        <div className="overflow-x-hidden">
            <HeroSection/>
            <OurStorySection/>
            <RecommendedProducts products={data}/>
            <StartHereSection/>
            <ExploreProductsSection/>


        </div>
    );
}

export default LandingPage;