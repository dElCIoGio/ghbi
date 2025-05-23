
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    ArrowRight,
    RefreshCw,
    ShoppingCart,
    Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { CartState, CartItem, DiscountCode } from "@/types/cart"
import type { RelatedProduct } from "@/types/product"
import {Link} from "react-router";
import RelatedProducts from "@/components/pages/shop-item/related-products.tsx";

export default function CartPage() {
    const [cartState, setCartState] = useState<CartState>({
        items: [],
        summary: {
            subtotal: 0,
            shipping: 0,
            tax: 0,
            discount: 0,
            total: 0,
        },
        discountCode: null,
        isLoading: true,
        error: null,
    })
    const [discountInput, setDiscountInput] = useState("")
    const [isApplyingDiscount, setIsApplyingDiscount] = useState(false)
    const [discountError, setDiscountError] = useState<string | null>(null)
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
    const [isUpdatingCart, setIsUpdatingCart] = useState(false)

    // Sample cart data
    const sampleCartItems: CartItem[] = [
        {
            id: 1,
            productId: 1,
            name: "Silky Straight Lace Front Wig",
            slug: "silky-straight-lace-front-wig",
            image: "/placeholder.svg?height=400&width=300&text=Wig%201",
            price: 269.99,
            originalPrice: 299.99,
            quantity: 1,
            maxQuantity: 10,
            selectedColor: { id: 1, name: "Natural Black", value: "#0f0f0f", inStock: true },
            selectedLength: { id: 2, value: "16 inches", inStock: true },
            selectedTexture: { id: 1, name: "Silky Straight", value: "silky-straight", inStock: true },
            sku: "GHBI-LFW-001",
        },
        {
            id: 2,
            productId: 4,
            name: "Blonde Straight Clip-in Extensions",
            slug: "blonde-straight-clip-in-extensions",
            image: "/placeholder.svg?height=400&width=300&text=Extension%201",
            price: 159.99,
            quantity: 2,
            maxQuantity: 15,
            selectedColor: { id: 5, name: "Blonde", value: "#d4b16a", inStock: true },
            selectedLength: { id: 3, value: "20 inches", inStock: true },
            selectedTexture: { id: 1, name: "Silky Straight", value: "silky-straight", inStock: true },
            sku: "GHBI-EXT-004",
        },
    ]

    // Sample related products
    const sampleRelatedProducts: RelatedProduct[] = [
        {
            id: 2,
            name: "Body Wave Full Lace Wig",
            price: 349.99,
            image: "/placeholder.svg?height=400&width=300&text=Body%20Wave",
            rating: 4.7,
            reviewCount: 98,
        },
        {
            id: 3,
            name: "Curly Closure Wig",
            price: 279.99,
            image: "/placeholder.svg?height=400&width=300&text=Curly%20Closure",
            rating: 4.5,
            reviewCount: 42,
            isNew: true,
        },
        {
            id: 12,
            name: "Bob Style Wig",
            price: 229.99,
            image: "/placeholder.svg?height=400&width=300&text=Bob%20Style",
            rating: 4.9,
            reviewCount: 108,
            discount: 10,
            isBestseller: true,
        },
        {
            id: 14,
            name: "Afro Kinky Curly Wig",
            price: 279.99,
            image: "/placeholder.svg?height=400&width=300&text=Kinky%20Curly",
            rating: 4.8,
            reviewCount: 92,
        },
    ]

    // Load cart data
    useEffect(() => {
        // Simulate API call to fetch cart data
        setTimeout(() => {
            const subtotal = sampleCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
            const shipping = subtotal > 150 ? 0 : 15
            const tax = subtotal * 0.08 // 8% tax rate
            const total = subtotal + shipping + tax

            setCartState({
                items: sampleCartItems,
                summary: {
                    subtotal,
                    shipping,
                    tax,
                    discount: 0,
                    total,
                },
                discountCode: null,
                isLoading: false,
                error: null,
            })

            setRelatedProducts(sampleRelatedProducts)
        }, 800)
    }, [])

    // Update cart summary when items change
    useEffect(() => {
        if (!cartState.isLoading) {
            const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            const shipping = subtotal > 150 ? 0 : 15
            const tax = subtotal * 0.08 // 8% tax rate
            let discount = 0

            if (cartState.discountCode) {
                if (cartState.discountCode.type === "percentage") {
                    discount = subtotal * (cartState.discountCode.value / 100)
                } else if (cartState.discountCode.type === "fixed") {
                    discount = cartState.discountCode.value
                }
            }

            const total = subtotal + shipping + tax - discount

            setCartState((prev) => ({
                ...prev,
                summary: {
                    subtotal,
                    shipping,
                    tax,
                    discount,
                    total,
                },
            }))
        }
    }, [cartState.items, cartState.discountCode])

    // Handle quantity change
    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setIsUpdatingCart(true)

        // Simulate API call to update cart
        setTimeout(() => {
            setCartState((prev) => ({
                ...prev,
                items: prev.items.map((item) =>
                    item.id === itemId ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item,
                ),
            }))
            setIsUpdatingCart(false)
        }, 300)
    }

    // Handle remove item
    const handleRemoveItem = (itemId: number) => {
        setIsUpdatingCart(true)

        // Simulate API call to remove item
        setTimeout(() => {
            setCartState((prev) => ({
                ...prev,
                items: prev.items.filter((item) => item.id !== itemId),
            }))
            setIsUpdatingCart(false)
        }, 300)
    }

    // Handle apply discount code
    const handleApplyDiscount = () => {
        if (!discountInput.trim()) {
            setDiscountError("Please enter a discount code")
            return
        }

        setIsApplyingDiscount(true)
        setDiscountError(null)

        // Simulate API call to validate discount code
        setTimeout(() => {
            // Sample discount codes for demonstration
            const validDiscountCodes: Record<string, DiscountCode> = {
                WELCOME10: {
                    code: "WELCOME10",
                    type: "percentage",
                    value: 10,
                    isValid: true,
                },
                FREESHIP: {
                    code: "FREESHIP",
                    type: "free_shipping",
                    value: 0,
                    isValid: true,
                },
                SAVE20: {
                    code: "SAVE20",
                    type: "percentage",
                    value: 20,
                    minimumPurchase: 300,
                    isValid: true,
                },
            }

            const discountCode = validDiscountCodes[discountInput.toUpperCase()]

            if (discountCode) {
                if (discountCode.minimumPurchase && cartState.summary.subtotal < discountCode.minimumPurchase) {
                    setDiscountError(`This code requires a minimum purchase of $${discountCode.minimumPurchase}`)
                } else {
                    setCartState((prev) => ({
                        ...prev,
                        discountCode,
                    }))
                    setDiscountInput("")
                }
            } else {
                setDiscountError("Invalid discount code")
            }

            setIsApplyingDiscount(false)
        }, 800)
    }

    // Handle remove discount code
    const handleRemoveDiscount = () => {
        setCartState((prev) => ({
            ...prev,
            discountCode: null,
        }))
    }

    // Format price
    const formatPrice = (price: number) => {
        return price.toFixed(2)
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

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    if (cartState.isLoading) {
        return (
            <div className="flex flex-col">
                <div className="flex-1 py-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2 space-y-4">
                                <div className="h-40 bg-muted rounded"></div>
                                <div className="h-40 bg-muted rounded"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-64 bg-muted rounded"></div>
                                <div className="h-12 bg-muted rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Empty cart state
    if (cartState.items.length === 0) {
        return (
            <div className="flex flex-col">
                <div className="flex-1 py-8">
                    <Breadcrumb className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <ChevronRight className="h-4 w-4" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink>Cart</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
                        <div className="rounded-full bg-muted p-6">
                            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold">Your cart is empty</h1>
                        <p className="text-muted-foreground max-w-md">
                            Looks like you haven't added any products to your cart yet. Browse our collection to find the perfect hair
                            products for you.
                        </p>
                        <Button size="lg" asChild>
                            <Link to="/shop">Continue Shopping</Link>
                        </Button>
                    </div>

                    {/* Related Products */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <RelatedProducts products={relatedProducts} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex p-4 flex-col">
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
                                <BreadcrumbLink>Cart</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2">
                            <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
                                {cartState.items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 relative"
                                        variants={fadeIn}
                                    >
                                        {isUpdatingCart && (
                                            <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-lg z-10">
                                                <RefreshCw className="h-6 w-6 animate-spin text-primary" />
                                            </div>
                                        )}
                                        <div className="relative h-32 sm:h-auto sm:w-32 rounded-md overflow-hidden shrink-0">
                                            <img src={item.image || "/placeholder.svg"} alt={item.name}
                                                 className="object-cover w-full h-full"/>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between">
                                                <Link to={`/shop/${item.slug}`} className="font-medium hover:text-primary transition-colors">
                                                    {item.name}
                                                </Link>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold">${formatPrice(item.price * item.quantity)}</span>
                                                    {item.originalPrice && (
                                                        <span className="text-sm text-muted-foreground line-through">
                              ${formatPrice(item.originalPrice * item.quantity)}
                            </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                    <span>Color: {item.selectedColor.name}</span>
                                                    <span>Length: {item.selectedLength.value}</span>
                                                    <span>Texture: {item.selectedTexture.name}</span>
                                                </div>
                                                <div className="mt-1">
                                                    <span>SKU: {item.sku}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap justify-between items-center gap-4 pt-2">
                                                <div className="flex items-center">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-r-none"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1 || isUpdatingCart}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <div className="h-8 px-3 flex items-center justify-center border-y w-12 text-center">
                                                        {item.quantity}
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-l-none"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.maxQuantity || isUpdatingCart}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                    {item.quantity >= item.maxQuantity && (
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <div className="ml-2 text-xs text-amber-500 flex items-center">
                                                                        <AlertCircle className="h-3 w-3 mr-1" />
                                                                        Max quantity
                                                                    </div>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>Maximum available quantity for this item</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 text-xs"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        disabled={isUpdatingCart}
                                                    >
                                                        <Trash2 className="h-3 w-3 mr-1" />
                                                        Remove
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                                                        <Heart className="h-3 w-3 mr-1" />
                                                        Save
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="mt-8 flex justify-between items-center">
                                <Button variant="outline" asChild>
                                    <Link to="/shop">
                                        <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                                        Continue Shopping
                                    </Link>
                                </Button>
                                <div className="text-sm text-muted-foreground">
                                    {cartState.items.length} {cartState.items.length === 1 ? "item" : "items"} in your cart
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <motion.div
                                className="border rounded-lg p-6 space-y-6 sticky top-24"
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                            >
                                <h2 className="text-xl font-bold">Order Summary</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${formatPrice(cartState.summary.subtotal)}</span>
                                    </div>

                                    {cartState.summary.shipping > 0 ? (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>${formatPrice(cartState.summary.shipping)}</span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="text-green-600">Free</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax (8%)</span>
                                        <span>${formatPrice(cartState.summary.tax)}</span>
                                    </div>

                                    {cartState.summary.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-${formatPrice(cartState.summary.discount)}</span>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${formatPrice(cartState.summary.total)}</span>
                                    </div>
                                </div>

                                {/* Discount Code */}
                                <div className="space-y-3">
                                    <h3 className="font-medium">Discount Code</h3>

                                    {cartState.discountCode ? (
                                        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-md p-3">
                                            <div className="flex items-center">
                                                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                                                <div>
                                                    <div className="font-medium">{cartState.discountCode.code}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {cartState.discountCode.type === "percentage"
                                                            ? `${cartState.discountCode.value}% off`
                                                            : cartState.discountCode.type === "fixed"
                                                                ? `$${cartState.discountCode.value} off`
                                                                : "Free shipping"}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={handleRemoveDiscount} className="h-8 text-xs">
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Enter discount code"
                                                    value={discountInput}
                                                    onChange={(e) => setDiscountInput(e.target.value)}
                                                    className="h-10"
                                                />
                                                <Button
                                                    onClick={handleApplyDiscount}
                                                    disabled={isApplyingDiscount || !discountInput.trim()}
                                                    className="shrink-0 h-10"
                                                >
                                                    {isApplyingDiscount ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
                                                    Apply
                                                </Button>
                                            </div>
                                            {discountError && (
                                                <div className="text-sm text-red-500 flex items-center">
                                                    <AlertCircle className="h-3 w-3 mr-1" />
                                                    {discountError}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Checkout Button */}
                                <Button asChild size="lg" className="w-full">
                                    <Link to="/checkout">
                                        <ShoppingBag className="h-4 w-4 mr-2" />
                                        Proceed to Checkout
                                    </Link>
                                </Button>

                                {/* Secure Checkout */}
                                <div className="text-xs text-center text-muted-foreground">
                                    <div className="flex justify-center mb-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4 mr-1"
                                        >
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        Secure Checkout
                                    </div>
                                    <p>We use industry-standard encryption to protect your data.</p>
                                </div>

                                {/* Free Shipping Alert */}
                                {cartState.summary.subtotal < 150 && (
                                    <Alert className="bg-primary/5 border-primary/20">
                                        <AlertCircle className="h-4 w-4 text-primary" />
                                        <AlertTitle>Free shipping available</AlertTitle>
                                        <AlertDescription>
                                            Add ${formatPrice(150 - cartState.summary.subtotal)} more to qualify for free shipping.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
                        <RelatedProducts products={relatedProducts} />
                    </div>
                </div>
            </div>

        </div>
    )
}
