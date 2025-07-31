
import type {ShopifyVariant} from "@/lib/shopify/types";

export interface ProductImage {
    id: number
    url: string
    alt: string
    isVideo?: boolean
    videoUrl?: string
}

// Product color type
export interface ProductColor {
    id: string
    name: string
    value: string
    inStock: boolean
}

// Product length type
export interface ProductLength {
    id: string
    value: string
    inStock: boolean
}

// Product texture type
export interface ProductTexture {
    id: string
    name: string
    value: string
    inStock: boolean
}

// Product review type
export interface ProductReview {
    id: number
    author: string
    date: string
    rating: number
    title: string
    content: string
    images?: string[]
    verified: boolean
}

// Related product type
export interface RelatedProduct {
    id: string
    name: string
    price: number
    image: string
    rating: number
    reviewCount: number
    discount?: number
    isNew?: boolean
    isBestseller?: boolean,
    slug: string
}

// Product details type
export interface Product {
    id: string
    slug: string
    name: string
    description: string
    price: number
    discount?: number
    rating: number
    isHighlighted: boolean
    reviewCount: number
    stockStatus: "in_stock" | "low_stock" | "out_of_stock"
    stockQuantity: number
    sku: string
    images: ProductImage[]
    colors: ProductColor[]
    lengths: ProductLength[]
    textures: ProductTexture[]
    category: "wigs" | "extensions" | "bundles" | "frontals" | "closures"
    texture: "straight" | "wavy" | "curly" | "deep wave" | "kinky curly" | "loose wave"
    type: string
    colour: string
    length: string
    features: string[]
    specifications: Record<string, string>
    careInstructions: string[]
    isNew?: boolean
    isBestseller?: boolean
    reviews: ProductReview[]
    relatedProducts: RelatedProduct[]
    variants: ShopifyVariant[];
}
