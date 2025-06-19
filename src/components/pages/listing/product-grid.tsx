import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { useProductsListingContext } from "@/context/listing-context";



const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Render star ratings
const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />
            ))}
            {hasHalfStar && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <Star key={`empty-star-${i}`} className="h-4 w-4 text-muted-foreground" />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">({rating})</span>
        </div>
    );
};

// Format filter labels
const formatLabel = (str: string) => {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export function ProductGrid() {
    const { filteredProducts, isLoading, currentPage, productsPerPage, clearFilters } = useProductsListingContext();

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={`grid-skeleton-${i}`} className="space-y-3">
                        <Skeleton className="h-[300px] w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                ))}
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <AnimatePresence>
                {currentProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        className="group relative overflow-hidden rounded-lg border bg-background p-2"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                        layout
                    >
                        <div className="relative aspect-square overflow-hidden rounded-md">
                            <Link to={product.slug}>
                                <img
                                    src={product.images[0].url || "/placeholder.svg"}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            </Link>

                            <div className="absolute top-2 right-2 flex flex-col gap-1">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                                >
                                    <Heart className="h-4 w-4" />
                                    <span className="sr-only">Add to wishlist</span>
                                </Button>
                            </div>
                            {product.isNew && (
                                <Badge className="absolute top-2 left-2" variant="secondary">
                                    New
                                </Badge>
                            )}
                            {product.isBestseller && (
                                <Badge className="absolute top-2 left-2" variant="default">
                                    Bestseller
                                </Badge>
                            )}
                            {product.discount && (
                                <Badge className="text-white absolute bottom-2 left-2 bg-primary" variant="outline">
                                    {product.discount}% OFF
                                </Badge>
                            )}
                        </div>
                        <div className="pt-3 pb-2 space-y-1">
                            <Link to={product.slug}>
                                <h3 className="font-medium leading-none line-clamp-1">{product.name}</h3>
                            </Link>
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline">
                                    {product.discount ? (
                                        <>
                                            <span className="font-bold">
                                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                            </span>
                                            <span className="ml-2 text-sm text-muted-foreground line-through">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-bold">${product.price.toFixed(2)}</span>
                                    )}
                                </div>
                            </div>
                            {renderRating(product.rating)}
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span className="capitalize">{formatLabel(product.category)}</span>
                                <span className="mx-1">•</span>
                                <span className="capitalize">{formatLabel(product.texture)}</span>
                            </div>
                            <div className="pt-2">
                                <Button asChild size="sm" className="w-full">
                                    <Link to={product.slug}>
                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
} 