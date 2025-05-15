// Product image type
export interface ProductImage {
    id: number
    url: string
    alt: string
    isVideo?: boolean
}

// Product color type
export interface ProductColor {
    id: number
    name: string
    value: string
    inStock: boolean
}

// Product length type
export interface ProductLength {
    id: number
    value: string
    inStock: boolean
}

// Product texture type
export interface ProductTexture {
    id: number
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
    id: number
    name: string
    price: number
    image: string
    rating: number
    reviewCount: number
    discount?: number
    isNew?: boolean
    isBestseller?: boolean
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
}

export const mockProducts: Product[] = [
    {
        id: "1",
        slug: "classic-bob-wig",
        name: "Classic Bob Wig",
        description: "A timeless bob wig perfect for any occasion.",
        price: 59.99,
        discount: 10,
        rating: 4.5,
        reviewCount: 34,
        stockStatus: "in_stock",
        stockQuantity: 100,
        sku: "WIG-BOB-001",
        isHighlighted: true,
        images: [
            {id: 1, url: "image-url-1.jpg", alt: "Classic Bob Wig Front"},
            {id: 2, url: "image-url-2.jpg", alt: "Classic Bob Wig Side"}
        ],
        colors: [
            {id: 1, name: "Natural Black", value: "#000000", inStock: true},
            {id: 2, name: "Chestnut Brown", value: "#8B4513", inStock: false}
        ],
        lengths: [
            {id: 1, value: "10 inches", inStock: true},
            {id: 2, value: "12 inches", inStock: true}
        ],
        texture: "loose wave",
        type: "standard",
        colour: "black",
        length: "10 inches",
        features: ["Heat resistant", "Lightweight", "Adjustable straps"],
        specifications: {
            Material: "Synthetic Fiber",
            Weight: "150 grams"
        },
        careInstructions: [
            "Wash with mild shampoo",
            "Air dry completely before use"
        ],
        isNew: true,
        isBestseller: true,
        reviews: [
            {
                id: 1,
                author: "Jane Doe",
                date: "2023-09-25",
                rating: 5,
                title: "Amazing Quality!",
                content: "Really impressed with the quality of this wig.",
                verified: true
            }
        ],
        relatedProducts: [
            {
                id: 2,
                name: "Curly Bob Wig",
                price: 65.99,
                image: "image-url-3.jpg",
                rating: 4.2,
                reviewCount: 15,
                discount: 5,
                isNew: false,
                isBestseller: true
            }
        ],
        category: "wigs"
    },
    {
        id: "2",
        slug: "long-body-wave-extension",
        name: "Long Body Wave Extension",
        description: "Luxurious body wave extensions for a voluminous look.",
        price: 89.99,
        rating: 4.8,
        reviewCount: 52,
        stockStatus: "low_stock",
        stockQuantity: 10,
        sku: "EXT-BODYWAVE-002",
        isHighlighted: false,
        images: [
            {id: 1, url: "image-url-4.jpg", alt: "Body Wave Extension Front"}
        ],
        colors: [
            {id: 1, name: "Jet Black", value: "#000000", inStock: true},
            {id: 2, name: "Caramel Blonde", value: "#FFD700", inStock: true}
        ],
        lengths: [
            {id: 1, value: "20 inches", inStock: true},
            {id: 2, value: "24 inches", inStock: true}
        ],
        texture: "wavy",
        type: "premium",
        colour: "black",
        length: "24 inches",
        features: ["100% human hair", "Tangle-free", "Can be dyed"],
        specifications: {Material: "Human Hair", Weight: "200 grams"},
        careInstructions: [
            "Use sulfate-free shampoo",
            "Comb gently to prevent tangling"
        ],
        isBestseller: true,
        category: "bundles",
        reviews: [
            {
                id: 1,
                author: "John Smith",
                date: "2023-10-01",
                rating: 5,
                title: "Perfect Extensions!",
                content: "These extensions blend perfectly with my hair.",
                images: ["image-url-5.jpg"],
                verified: true
            }
        ],
        relatedProducts: [
            {
                id: 3,
                name: "Straight Hair Extension",
                price: 79.99,
                image: "image-url-6.jpg",
                rating: 4.5,
                reviewCount: 20,
                isNew: true,
                isBestseller: false
            }
        ]
    },
    {
        id: "3",
        slug: "loose-wave-closure",
        name: "Loose Wave Closure",
        description: "A closure piece with a gorgeous loose wave texture.",
        price: 45.99,
        discount: 5,
        rating: 4.3,
        reviewCount: 18,
        stockStatus: "in_stock",
        stockQuantity: 50,
        sku: "CLO-LOOSE-003",
        isHighlighted: false,
        images: [
            {id: 1, url: "image-url-7.jpg", alt: "Loose Wave Closure Front"}
        ],
        colors: [
            {id: 1, name: "Natural Brown", value: "#8B4513", inStock: true}
        ],
        lengths: [
            {id: 1, value: "12 inches", inStock: true},
            {id: 2, value: "14 inches", inStock: true}
        ],
        texture: "loose wave",
        type: "closure",
        colour: "brown",
        length: "12 inches",
        features: ["Soft texture", "Pre-plucked", "Easy to install"],
        specifications: {
            Material: "Human Hair",
            Density: "150%"
        },
        careInstructions: [
            "Wash with sulfate-free shampoo",
            "Ensure proper conditioning"
        ],
        isNew: true,
        isBestseller: false,
        reviews: [
            {
                id: 1,
                author: "Emily Stone",
                date: "2023-09-15",
                rating: 4,
                title: "Great Closure!",
                content: "Good quality, but could be thicker.",
                verified: true
            }
        ],
        relatedProducts: [
            {
                id: 4,
                name: "Body Wave Closure",
                price: 49.99,
                image: "image-url-8.jpg",
                rating: 4.6,
                reviewCount: 22,
                isBestseller: true
            }
        ],
        category: "closures"
    },
    {
        id: "4",
        slug: "straight-frontal",
        name: "Straight Frontal",
        description: "A frontal piece with silky-straight texture.",
        price: 75.99,
        rating: 4.9,
        reviewCount: 40,
        stockStatus: "low_stock",
        stockQuantity: 15,
        sku: "FRONT-STRAIGHT-004",
        isHighlighted: true,
        images: [
            {id: 1, url: "image-url-9.jpg", alt: "Straight Frontal Front"}
        ],
        colors: [
            {id: 1, name: "Jet Black", value: "#000000", inStock: true},
            {id: 2, name: "Natural Brown", value: "#654321", inStock: true}
        ],
        lengths: [
            {id: 1, value: "18 inches", inStock: true},
            {id: 2, value: "20 inches", inStock: true}
        ],
        texture: "straight",
        type: "frontal",
        colour: "black",
        length: "20 inches",
        features: ["Natural hairline", "Heat-friendly", "High density"],
        specifications: {
            Material: "Human Hair",
            Weight: "180 grams"
        },
        careInstructions: [
            "Deep condition regularly",
            "Avoid excessive heat"
        ],
        isNew: false,
        isBestseller: true,
        reviews: [
            {
                id: 1,
                author: "Jack Wilson",
                date: "2023-10-05",
                rating: 5,
                title: "Best Frontal I Ever Had!",
                content: "Super silky and matches my hair perfectly.",
                verified: true
            }
        ],
        relatedProducts: [
            {
                id: 5,
                name: "Silky Straight Closure",
                price: 49.99,
                image: "image-url-10.jpg",
                rating: 4.7,
                reviewCount: 25,
                isNew: true,
                isBestseller: false
            }
        ],
        category: "frontals"
    }
];
