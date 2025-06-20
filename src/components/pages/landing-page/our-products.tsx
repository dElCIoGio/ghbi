import {Button} from "@/components/ui/button";
import type {Product} from "@/types/product";
import {Link} from "react-router";


interface Props {
    products: Product[];
}


const RecommendedProducts = ({products}: Props) => {

    return (
        <section id="products" className="w-full bg-white py-20 px-6">

            {/* Heading */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-poppins font-semibold">Recommended</h2>
                <p className="text-pink-400 font-great-vibes text-5xl italic -mt-4">Products</p>
            </div>

            {/* Product Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10 justify-items-center">
                {products.map((product) => (
                    <div key={product.id} className="w-full max-w-[400px] bg-white">
                        {/* Image Placeholder */}
                        <div>
                            <img src={product.images[0]?.url} alt=""/>
                        </div>

                        {/* Info */}
                        <div className="mt-4 space-y-1">
                            <p className="text-sm text-gray-400">Bundles</p>
                            <p className="font-medium text-black">{product.name}</p>
                            <p className="font-bold text-black">£{product.price}</p>
                        </div>

                        {/* Button */}
                        <Button
                            variant="secondary"
                            asChild
                            className="w-full mt-4 py-3 text-black font-medium">
                            <Link to={`shop/${product.slug}`}>
                                View More
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedProducts;