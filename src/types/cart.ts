import type { ProductColor, ProductLength, ProductTexture } from "./product"

export interface CartItem {
    id: number
    productId: number
    name: string
    slug: string
    image: string
    price: number
    originalPrice?: number
    quantity: number
    maxQuantity: number
    selectedColor: ProductColor
    selectedLength: ProductLength
    selectedTexture: ProductTexture
    sku: string
}

export interface CartSummary {
    subtotal: number
    shipping: number
    tax: number
    discount: number
    total: number
}

export interface DiscountCode {
    code: string
    type: "percentage" | "fixed" | "free_shipping"
    value: number
    minimumPurchase?: number
    expiryDate?: string
    isValid: boolean
    errorMessage?: string
}

export interface CartState {
    items: CartItem[]
    summary: CartSummary
    discountCode: DiscountCode | null
    isLoading: boolean
    error: string | null
}
