

import {HeroImage} from '@/assets';
import {Button} from "@/components/ui/button";
import {Link} from "react-router"; // adjust this path as needed

const HeroSection = () => {
    return (
        <section className="flex font-dm-sans h-screen w-full overflow-hidden">
            {/* Left: Text Section */}
            <div className="w-1/2 flex flex-col justify-center px-16 bg-zinc-100">
                <h1 className="text-6xl font-semibold leading-tight text-black">
                    Beauty <br /> wakes up skin <br /> at night
                </h1>
                <p className="text-gray-500 mt-6 max-w-md">
                    Celebrate love with our exquisite jewellery, symbolizing the timeless bond between two souls
                </p>

                <div className="mt-8 flex items-center gap-6">
                    <Button className="font-medium hover:opacity-90">
                        Shop Now
                    </Button>
                    <Button asChild variant="link" className="font-medium">
                        <Link to="shop">
                            All Products
                        </Link>
                    </Button>
                </div>

                <button className="">
                    <div className="mt-16 flex items-center gap-2 text-sm text-gray-400">
                        <span className="animate-[bounce_2.5s_infinite]">↓</span>
                        <span>Scroll down</span>
                    </div>
                </button>

            </div>

            {/* Right: Image Section */}
            <div className="w-1/2 h-full overflow-hidden relative bg-[#f1c6cc]">
                <img
                    src={HeroImage}
                    alt="Hero"
                    className="w-full h-full object-cover object-center"
                    style={{ objectPosition: 'center top' }} // adjust as needed to center on the face
                />
            </div>
        </section>
    );
};
export default HeroSection;

