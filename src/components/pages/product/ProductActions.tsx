import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Heart, Share2, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProductContext } from "@/context/product-context"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"
import type {CartItem} from "@/types/cart"

interface ProductActionsProps {
    selectedOptions: {
        color: string | null
        length: string | null
        price: number
        quantityAvailable: number
    }
}

export function ProductActions({ selectedOptions }: ProductActionsProps) {
    const { product } = useProductContext()
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [isAddedToCart, setIsAddedToCart] = useState(false)
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false)

    const incrementQuantity = () => {
        if (quantity < selectedOptions.quantityAvailable) {
            setQuantity(quantity + 1)
        }
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        if (!selectedOptions.color || !selectedOptions.length) {
            toast.error("Please select all options before adding to cart")
            return
        }

        // Find the matching variant
        const matchingVariant = product.variants.find(variant => {
            if (!variant.selectedOptions) return false
            return variant.selectedOptions.every(option => {
                if (option.name === 'Color') return option.value === selectedOptions.color
                if (option.name === 'Length') return option.value === selectedOptions.length
                return false
            })
        })

        if (!matchingVariant) {
            toast.error("Selected combination is not available")
            return
        }

        // Create cart item
        const cartItem: CartItem = {
            id: matchingVariant.id,
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.images[0]?.url || "",
            price: selectedOptions.price,
            quantity: quantity,
            maxQuantity: selectedOptions.quantityAvailable,
            selectedColor: product.colors.find(c => c.value === selectedOptions.color)!,
            selectedLength: product.lengths.find(l => l.value === selectedOptions.length)!,
            sku: matchingVariant.sku,
            originalPrice: product.price,
        }

        addToCart(cartItem)
        setIsAddedToCart(true)

        toast.success("Added to cart", {
            // action: {
            //     label: "Undo",
            //     onClick: () => {
            //         removeFromCart(cartItem.id, {
            //             color: selectedOptions.color,
            //             length: selectedOptions.length,
            //             texture: selectedOptions.texture
            //         })
            //         setIsAddedToCart(false)
            //     }
            // }
        })

        // Reset after animation
        setTimeout(() => {
            setIsAddedToCart(false)
        }, 2000)
    }

    const handleAddToWishlist = () => {
        setIsAddedToWishlist(!isAddedToWishlist)
        toast.success(isAddedToWishlist ? "Removed from wishlist" : "Added to wishlist")
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                    <button
                        className="px-3 py-2 hover:bg-muted/50 transition-colors"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                        className="px-3 py-2 hover:bg-muted/50 transition-colors"
                        onClick={incrementQuantity}
                        disabled={quantity >= selectedOptions.quantityAvailable}
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <span className="text-sm text-muted-foreground">
                    {selectedOptions.quantityAvailable <= 0? "Not Available": "In Stock"}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                    size="lg"
                    className="flex-1 gap-2 py-3"
                    onClick={handleAddToCart}
                    disabled={!selectedOptions.color || !selectedOptions.length || selectedOptions.quantityAvailable === 100}
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
                <Button variant="outline" size="lg" className="gap-2">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
} 