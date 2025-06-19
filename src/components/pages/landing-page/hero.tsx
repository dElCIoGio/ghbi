

import {HeroImage} from '@/assets';
import {Button} from "@/components/ui/button";
import {Link} from "react-router"; // adjust this path as needed

const HeroSection = () => {
    return (
        <section className="relative flex h-screen w-full font-dm-sans overflow-hidden flex-col md:flex-row">

            {/* ✅ Background image for small and medium screens (behind text) */}
            <div className="absolute inset-0 block lg:hidden z-0">
                <img
                    src={HeroImage}
                    alt="Hero"
                    className="w-full h-full object-cover object-top"
                />
            </div>

            {/* ✅ Left: Text Section */}
            <div
                className={`
                    relative z-10 
                    w-full md:w-[70%] lg:w-1/2 
                    h-full 
                    flex flex-col justify-center px-6 md:px-10 lg:px-16
                    bg-white/60 backdrop-blur-sm
                    lg:bg-zinc-100 lg:backdrop-blur-0
                `}
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-black">
                    Wake up flawless. Sleep in style. Slay all day.
                </h1>
                <p className="text-gray-500 mt-6 max-w-md">
                    Feel confident, feminine and unstoppable with our 100% quality hair extensions — designed to give you luxury without limits.
                </p>

                <div className="mt-8 flex items-center gap-6">
                    <Button className="font-medium hover:opacity-90">
                        Shop Now
                    </Button>
                    <Button asChild variant="link" className="font-medium">
                        <Link to="shop">Browse All Styles</Link>
                    </Button>
                </div>

                <a href="#products">
                    <div className="mt-16 flex items-center gap-2 text-sm text-gray-400">
                        <span className="animate-bounce">↓</span>
                        <span>Find More</span>
                    </div>
                </a>
            </div>

            {/* ✅ Right: Image Section only for large screens */}
            <div className="hidden lg:block w-1/2 h-full overflow-hidden relative bg-[#f1c6cc]">
                <img
                    src={HeroImage}
                    alt="Hero"
                    className="w-full h-full object-cover object-top"
                />
            </div>
        </section>
    );
};
export default HeroSection;

