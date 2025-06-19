

import {HeroImage} from '@/assets';
import {Button} from "@/components/ui/button";
import {Link} from "react-router"; // adjust this path as needed

const HeroSection = () => {
    return (
        <section
            className="relative font-dm-sans min-h-[600px] md:min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <img
                src={HeroImage}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ objectPosition: 'center top' }}
            />

            {/* Overlay */}
            <div className="relative flex items-center h-full">
                <div
                    className="w-full md:w-[70%] bg-zinc-100/80 flex flex-col justify-center px-8 md:px-16 py-12 backdrop-blur-sm">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-black">
                        Beauty <br /> wakes up skin <br /> at night
                    </h1>
                    <p className="text-gray-500 mt-4 md:mt-6 max-w-md">
                        Celebrate love with our exquisite jewellery, symbolizing the timeless bond between two souls
                    </p>

                    <div className="mt-6 md:mt-8 flex items-center gap-4 md:gap-6">
                        <Button className="font-medium hover:opacity-90">
                            Shop Now
                        </Button>
                        <Button asChild variant="link" className="font-medium">
                            <Link to="shop">
                                All Products
                            </Link>
                        </Button>
                    </div>

                    <button>
                        <div className="mt-12 md:mt-16 flex items-center gap-2 text-sm text-gray-400">
                            <span className="animate-[bounce_2.5s_infinite]">↓</span>
                            <span>Scroll down</span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};
export default HeroSection;

