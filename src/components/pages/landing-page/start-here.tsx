import img1 from "@/assets/48D70D2B-3370-4FCA-BE58-2307DA172C1B.jpeg"
import img2 from "@/assets/FE9995C8-847C-46EF-A011-EB51088393FA.jpeg"
import img3 from "@/assets/Facetune_18-05-2025-11-57-01.jpg"


const StartHereSection = () => {
    return (
        <section className="w-full hidden px-6 md:px-20 py-20 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-medium mb-12">
                    Your Beauty And Success <br />
                    <span className="font-bold">Start Here!</span>
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Card 1 */}
                    <div>
                        <div className="h-72 overflow-hidden rounded-xl">
                            <img src={img1} alt="Beauty 1" className="w-full h-full object-cover" />
                        </div>
                        <p className="mt-4 text-black text-sm md:text-base">
                            Revitalize Your Skin and Spirit at Our Beauty Center
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div>
                        <img src={img2} alt="Beauty 2" className="rounded-xl w-full object-cover" />
                    </div>

                    {/* Card 3 aligned to bottom */}
                    <div className="flex flex-col justify-end h-full">
                        <p className="mb-4 text-black text-sm md:text-base">
                            Discover Your <br /> Beauty Potential
                        </p>
                        <div className="h-72 overflow-hidden rounded-xl">
                            <img src={img3} alt="Beauty 3" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StartHereSection;