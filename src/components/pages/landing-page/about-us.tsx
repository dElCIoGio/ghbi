import {Button} from "@/components/ui/button";


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
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                    <Button variant="secondary" className="font-semibold">
                        Read Full Story
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default OurStorySection;