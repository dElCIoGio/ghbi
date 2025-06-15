import { useState, useEffect } from "react"
import type {CartItem} from "@/types/cart";



export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart))
            } catch (error) {
                console.error("Error parsing cart from localStorage:", error)
                setCart([])
            }
        }
        setIsLoading(false)
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }, [cart, isLoading])

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                return [...prev, item];
            }
        });
    };

    const removeFromCart = (variantId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== variantId));
    };


    const updateQuantity = (variantId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(variantId);
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === variantId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCart([])
    }

    const getCartTotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const getCartItemsCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    return {
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
    }
}
