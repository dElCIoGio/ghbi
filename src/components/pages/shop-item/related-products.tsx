import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, StarHalf, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import type { RelatedProduct } from "@/types/product"
import {Link} from "react-router";

interface RelatedProductsProps {
    products: RelatedProduct[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    // Scroll functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
    }

    // Calculate discounted price
    const calculateDiscountedPrice = (price: number, discount?: number) => {
        if (!discount) return price
        return price * (1 - discount / 100)
    }

    // Format price
    const formatPrice = (price: number) => {
        return price.toFixed(2)
    }

    // Render star ratings
    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`star-${i}`} className="h-3 w-3 fill-primary text-primary" />
                ))}
                {hasHalfStar && <StarHalf className="h-3 w-3 fill-primary text-primary" />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <Star key={`empty-star-${i}`} className="h-3 w-3 text-muted-foreground" />
                ))}
            </div>
        )
    }

    return (
        <div className="w-full relative px-8">
            {!isMobile && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 shadow-sm"
                        onClick={scrollLeft}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 shadow-sm"
                        onClick={scrollRight}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </>
            )}

            <div
                ref={scrollContainerRef}
                className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-hide w-full"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        className="group relative min-w-[240px] max-w-[240px] overflow-hidden rounded-lg border bg-background p-2 flex-shrink-0"
                        whileHover={{ y: -5 }}
                    >
                        <Link to={`/shop/${product.slug}`} className="block">
                            <div className="relative aspect-square overflow-hidden rounded-md">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    width={240}
                                    height={240}
                                    className="object-cover transition-transform group-hover:scale-105"
                                    style={{objectFit: "cover"}}
                                />
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
                                    <Badge className="absolute bottom-2 left-2 bg-primary" variant="outline">
                                        {product.discount}% OFF
                                    </Badge>
                                )}
                            </div>
                            <div className="pt-3 pb-2 space-y-1">
                                <h3 className="font-medium leading-none line-clamp-1">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline">
                                        {product.discount ? (
                                            <>
                        <span className="font-bold">
                          ${formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                        </span>
                                                <span className="ml-2 text-xs text-muted-foreground line-through">
                          ${formatPrice(product.price)}
                        </span>
                                            </>
                                        ) : (
                                            <span className="font-bold">${formatPrice(product.price)}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {renderRating(product.rating)}
                                    <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                                </div>
                            </div>
                        </Link>
                        <Button size="sm" className="w-full mt-1">
                            <ShoppingBag className="mr-2 h-3 w-3" />
                            Add to Cart
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
