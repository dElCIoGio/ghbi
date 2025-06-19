import backgroundImg from "@/assets/two.png"
import {Button} from "@/components/ui/button";



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
                    Explore Our Products
                </h2>
                <p className="text-lg leading-relaxed mb-8">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <Button variant="secondary" className="bg-white/30 px-6 hover:bg-white/40 text-white">
                    Find More
                </Button>
            </div>
        </section>
    );
};

export default ExploreProductsSection