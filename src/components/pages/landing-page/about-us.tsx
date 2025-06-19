import {Button} from "@/components/ui/button";
import {Link} from "react-router";


const OurStorySection = () => {
    return (
        <section className="w-full px-8 md:px-24 py-20 bg-white">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
                {/* Left Title */}
                <h2 className="text-3xl md:text-4xl font-semibold w-full md:w-1/3">
                    Our stories
                </h2>

                {/* Right Content */}
                <div className="w-full md:w-2/3 space-y-6">
                    <p className="text-gray-600 text-base leading-relaxed">
                        Behind every bundle is a bold woman rewriting her own rules. Whether it’s a glow-up moment, a fresh start, or just a vibe switch — our hair is there with you every step (and selfie) of the way.                    </p>
                    <Button asChild variant="secondary" className="font-semibold">
                        <Link to="about-us">
                            Read Full Story
                        </Link>

                    </Button>
                </div>
            </div>
        </section>
    );
};

export default OurStorySection;