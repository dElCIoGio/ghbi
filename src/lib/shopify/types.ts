export type Edge<T> = { node: T };

export interface ShopifyImage {
    url: string;
    altText: string | null;
}

export interface ShopifyVideoSource {
    url: string;
    mimeType?: string;
}

export interface ShopifyMedia {
    mediaContentType: string;
    image?: ShopifyImage;
    previewImage?: { url: string };
    sources?: ShopifyVideoSource[];
}

export interface ShopifyVariant {
    id: string;
    sku: string;
    price: {
        amount: string;
        currencyCode: string;
    };
    quantityAvailable: number;
    selectedOptions?: {
        name: string;
        value: string;
    }[];
}




export interface ShopifyMetafield {
    value: string;
}


export interface ShopifyProduct {
    id: string;
    title: string;
    description: string;
    handle: string;
    tags: string[];
    images: {
        edges: Edge<ShopifyImage>[];
    };
    media?: {
        edges: Edge<ShopifyMedia>[];
    };
    variants: {
        edges: Edge<ShopifyVariant>[];
    };
    features?: ShopifyMetafield;
    careInstructions?: ShopifyMetafield;
    category?: ShopifyMetafield;
    texture?: ShopifyMetafield;
    specifications?: ShopifyMetafield;
    highlighted?: ShopifyMetafield;
}


