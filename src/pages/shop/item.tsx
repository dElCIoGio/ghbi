
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ShoppingBag,
    Heart,
    Share2,
    ChevronRight,
    Star,
    StarHalf,
    Truck,
    RotateCcw,
    Shield,
    Minus,
    Plus,
    Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {mockProducts, type Product} from "@/types/product"
import {useParams} from "react-router";
import ProductReviews from "@/components/pages/shop-item/product-review.tsx";
import RelatedProducts from "@/components/pages/shop-item/related-products.tsx";
import ProductImageGallery from "@/components/pages/shop-item/product-image-gallery.tsx";

export default function ProductPage() {

    const { productId } = useParams() as unknown as { productId: string };
    console.log(productId);
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState<Product | null>(null)
    const [selectedColor, setSelectedColor] = useState<number | null>(null)
    const [selectedLength, setSelectedLength] = useState<number | null>(null)
    const [selectedTexture, setSelectedTexture] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [isAddedToCart, setIsAddedToCart] = useState(false)
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false)

    // Sample product data

    // Load product data
    useEffect(() => {
        // Simulate API call to fetch product data
        setTimeout(() => {
            setProduct(mockProducts[0])
            setSelectedColor(mockProducts[0].colors.find((c) => c.inStock)?.id || null)
            setSelectedLength(mockProducts[0].lengths.find((l) => l.inStock)?.id || null)
            setSelectedTexture(mockProducts[0].texture)
            setIsLoading(false)
        }, 800)
    }, [])

    // Handle quantity change
    const incrementQuantity = () => {
        if (product && quantity < product.stockQuantity) {
            setQuantity(quantity + 1)
        }
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    // Handle add to cart
    const handleAddToCart = () => {
        if (!selectedColor || !selectedLength || !selectedTexture) {
            // Show error or prompt user to select options
            return
        }

        // Add to cart logic would go here
        setIsAddedToCart(true)

        // Reset after animation
        setTimeout(() => {
            setIsAddedToCart(false)
        }, 2000)
    }

    // Handle add to wishlist
    const handleAddToWishlist = () => {
        setIsAddedToWishlist(!isAddedToWishlist)
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
                    <Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />
                ))}
                {hasHalfStar && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <Star key={`empty-star-${i}`} className="h-4 w-4 text-muted-foreground" />
                ))}
            </div>
        )
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    }

    if (isLoading || !product) {
        return (
            <div className="flex flex-col">
                <div className="flex-1 py-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-muted rounded"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-1/2"></div>
                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                </div>
                                <div className="h-10 bg-muted rounded w-full"></div>
                                <div className="h-10 bg-muted rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full p-4 flex-col">

            <div className="flex-1">
                <div className="py-6">
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop/wigs">Wigs</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink>{product.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        {/* Product Images */}
                        <div>
                            <ProductImageGallery images={product.images} />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    {product.isNew && <Badge variant="secondary">New</Badge>}
                                    {product.isBestseller && <Badge>Bestseller</Badge>}
                                    {product.stockStatus === "low_stock" && (
                                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                                            Low Stock
                                        </Badge>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    {renderRating(product.rating)}
                                    <span className="text-sm text-muted-foreground">
                    ({product.rating}) · {product.reviewCount} reviews
                  </span>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-2">
                                {product.discount ? (
                                    <>
                    <span className="text-2xl font-bold">
                      ${formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                    </span>
                                        <span className="text-lg text-muted-foreground line-through">${formatPrice(product.price)}</span>
                                        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                                            {product.discount}% OFF
                                        </Badge>
                                    </>
                                ) : (
                                    <span className="text-2xl font-bold">${formatPrice(product.price)}</span>
                                )}
                            </div>

                            <p className="text-muted-foreground">{product.description}</p>

                            <div className="space-y-4">
                                {/* Color Selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Color</span>
                                        {selectedColor && (
                                            <span className="text-sm text-muted-foreground">
                        {product.colors.find((c) => c.id === selectedColor)?.name}
                      </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color.id}
                                                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                                                    !color.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-110"
                                                } ${selectedColor === color.id ? "border-primary ring-2 ring-primary/20" : "border-muted"}`}
                                                style={{ backgroundColor: color.value }}
                                                onClick={() => color.inStock && setSelectedColor(color.id)}
                                                disabled={!color.inStock}
                                                aria-label={color.name}
                                            >
                                                {selectedColor === color.id && (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                            <Check className="h-5 w-5 text-white drop-shadow-md" />
                          </span>
                                                )}
                                                {!color.inStock && (
                                                    <span className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-0.5 bg-muted-foreground/70 rotate-45 rounded-full" />
                          </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Length Selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Length</span>
                                        {selectedLength && (
                                            <span className="text-sm text-muted-foreground">
                        {product.lengths.find((l) => l.id === selectedLength)?.value}
                      </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.lengths.map((length) => (
                                            <button
                                                key={length.id}
                                                className={`px-4 py-2 rounded-md border transition-all ${
                                                    !length.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50"
                                                } ${selectedLength === length.id ? "border-primary bg-primary/5" : "border-muted"}`}
                                                onClick={() => length.inStock && setSelectedLength(length.id)}
                                                disabled={!length.inStock}
                                            >
                                                {length.value}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Texture Selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Texture</span>
                                        {selectedTexture && (
                                            <span className="text-sm text-muted-foreground">
                                                {product.texture}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div>
                                    <span className="font-medium block mb-2">Quantity</span>
                                    <div className="flex items-center">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={decrementQuantity}
                                            disabled={quantity <= 1}
                                            className="rounded-r-none"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <div className="px-4 py-2 border-y w-16 text-center">{quantity}</div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={incrementQuantity}
                                            disabled={product && quantity >= product.stockQuantity}
                                            className="rounded-l-none"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                        <span className="ml-4 text-sm text-muted-foreground">{product.stockQuantity} available</span>
                                    </div>
                                </div>
                            </div>

                            {/* Add to Cart and Wishlist */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button
                                    size="lg"
                                    className="flex-1 gap-2"
                                    onClick={handleAddToCart}
                                    disabled={!selectedColor || !selectedLength || !selectedTexture}
                                >
                                    <AnimatePresence mode="wait">
                                        {isAddedToCart ? (
                                            <motion.span
                                                key="added"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="flex items-center gap-2"
                                            >
                                                <Check className="h-5 w-5" />
                                                Added to Cart
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="add"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="flex items-center gap-2"
                                            >
                                                <ShoppingBag className="h-5 w-5" />
                                                Add to Cart
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>
                                <Button variant="outline" size="lg" className="gap-2" onClick={handleAddToWishlist}>
                                    <Heart className={`h-5 w-5 ${isAddedToWishlist ? "fill-primary text-primary" : ""}`} />
                                    <span className="hidden sm:inline">Wishlist</span>
                                </Button>
                                <Button variant="outline" size="icon" className="hidden sm:flex">
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Shipping and Returns */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-start gap-3">
                                    <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Free Shipping</h4>
                                        <p className="text-xs text-muted-foreground">On orders over $150</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">30-Day Returns</h4>
                                        <p className="text-xs text-muted-foreground">Satisfaction guaranteed</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <h4 className="font-medium text-sm">Secure Checkout</h4>
                                        <p className="text-xs text-muted-foreground">Safe & protected</p>
                                    </div>
                                </div>
                            </div>

                            {/* SKU */}
                            <div className="pt-2">
                                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Details Tabs */}
                    <div className="mt-12">
                        <Tabs defaultValue="features" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                                <TabsTrigger value="care">Care Instructions</TabsTrigger>
                                <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
                            </TabsList>
                            <TabsContent value="features" className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Key Features</h3>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <img
                                            src="/placeholder.svg?height=400&width=600&text=Product%20Features"
                                            alt="Product features"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="specifications" className="pt-6">
                                <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {Object.entries(product.specifications).map(([key, value], index) => (
                                        <div key={index} className="flex justify-between py-2 border-b">
                                            <span className="font-medium">{key}</span>
                                            <span className="text-muted-foreground">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="care" className="pt-6">
                                <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <ul className="space-y-3">
                                            {product.careInstructions.map((instruction, index) => (
                                                <li key={index} className="flex items-start gap-2">
                          <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                                                    <span>{instruction}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="relative aspect-video rounded-lg overflow-hidden">
                                        <img
                                            src="/placeholder.svg?height=400&width=600&text=Care%20Instructions"
                                            alt="Care instructions"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="reviews" className="pt-6">
                                <ProductReviews reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Related Products */}
                    <div className="mt-16 w-full">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <RelatedProducts products={product.relatedProducts} />
                    </div>
                </div>
            </div>

        </div>
    )
}
