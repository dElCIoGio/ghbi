import backgroundImg from "@/assets/two.png"
import {Button} from "@/components/ui/button";
import {Link} from "react-router";



const ExploreProductsSection = () => {
    return (
        <section
            className="relative w-full h-[500px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center px-6"
            style={{
                backgroundImage: `url(${backgroundImg})`,
            }}
        >
            {/* Optional dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl text-white">
                <h2 className="text-4xl font-poppins md:text-5xl font-bold mb-6">
                    Explore Our Collection
                </h2>
                <p className="leading-relaxed mb-8">
                    Whether you’re switching it up or keeping it classic — we’ve got the textures, lengths, and vibes to match your mood. Discover extensions that last, slay, and make you feel that girl.
                </p>
                <Button variant="secondary" className="bg-white/30 px-6 hover:bg-white/40 text-white">
                    <Link to="shop">
                        Find Your Look
                    </Link>
                </Button>
            </div>
        </section>
    );
};

export default ExploreProductsSection