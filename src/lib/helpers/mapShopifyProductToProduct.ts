import type {Product, ProductTexture} from "@/types/product";
import type {ShopifyProduct} from "@/lib/shopify/types";

export function mapShopifyProductToProduct(shopify: ShopifyProduct): Product {

    const variants = shopify.variants.edges.map((edge) => edge.node);
    const firstVariant = variants[0];

    const colorSet = new Set<string>();
    const lengthSet = new Set<string>();
    const textureSet = new Set<string>();

    for (const variant of variants) {

        if (!variant.selectedOptions){continue;}

        for (const opt of variant.selectedOptions ?? []) {
            // if (variant.quantityAvailable === 0) continue;

            const name = opt.name.toLowerCase();
            const value = opt.value;
            if (name === "color") colorSet.add(value);
            else if (name === "length") lengthSet.add(value);
            else if (name === "texture") textureSet.add(value);
        }
    }

    const colors = Array.from(colorSet).map((val, i) => ({
        id: `${i}`,
        name: val,
        value: val,
        inStock: true,
    }));

    const lengths = Array.from(lengthSet).map((val, i) => ({
        id: `${i}`,
        value: val,
        inStock: true,
    }));


    const textures = Array.from(textureSet).map((val, i): ProductTexture => ({
        id: `${i}`,
        name: val,
        value: val,
        inStock: true
    }));

    // Determine product length category based on the first variant length value
    let productLength: string = "default";
    const firstLengthOption = firstVariant?.selectedOptions?.find(
        opt => opt.name.toLowerCase() === "length"
    );
    if (firstLengthOption) {
        const parsed = parseFloat(firstLengthOption.value);
        if (!Number.isNaN(parsed)) {
            if (parsed <= 14) productLength = "short";
            else if (parsed <= 22) productLength = "medium";
            else productLength = "long";
        }
    }

    return {
        id: shopify.id,
        slug: shopify.handle,
        name: shopify.title,
        description: shopify.description,
        price: Number(firstVariant?.price.amount ?? 0),
        discount: undefined, // Optional: can be derived or pulled from metafields
        rating: 5, // Placeholder or external reviews system
        reviewCount: 0, // Same as above
        isHighlighted: shopify.highlighted?.value === "true",
        stockQuantity: firstVariant?.quantityAvailable ?? 0,
        stockStatus:
            firstVariant?.quantityAvailable === 0
                ? "out_of_stock"
                : firstVariant?.quantityAvailable < 5
                    ? "low_stock"
                    : "in_stock",
        sku: firstVariant?.sku ?? "",
        images: (shopify.media?.edges && shopify.media.edges.length > 0
            ? shopify.media.edges.map((edge, i) => {
                if (edge.node.mediaContentType === "VIDEO") {
                    return {
                        id: i,
                        url: edge.node.previewImage?.url ?? "",
                        alt: "",
                        isVideo: true,
                    };
                }
                return {
                    id: i,
                    url: edge.node.image?.url ?? "",
                    alt: edge.node.image?.altText ?? "",
                };
            })
            : shopify.images.edges.map((edge, i) => ({
                id: i,
                url: edge.node.url,
                alt: edge.node.altText ?? "",
            }))
        ),
        colors,
        lengths,
        textures,
        category: (shopify.category?.value ?? "Bundles") as Product["category"],
        texture: (textures.length > 0 ? textures[0].value : "straight") as Product["texture"], // fallback to metafield already handled here
        type: "standard", // You can make this dynamic later
        colour: "default", // colors[0]?.value ?? "default",
        length: productLength,
        features: parseJsonList(shopify.features?.value),
        specifications: parseKeyValueString(shopify.specifications?.value),
        careInstructions: parseJsonList(shopify.careInstructions?.value),
        isNew: shopify.tags?.includes("new") ?? false,
        isBestseller: shopify.tags?.includes("bestseller") ?? false,
        reviews: [], // Placeholder — add your review system later
        relatedProducts: [], // Can be populated manually or via metafields,
        variants
    };
}



function parseJsonList(input?: string): string[] {
    try {
        return input ? JSON.parse(input) : [];
    } catch {
        return [];
    }
}

function parseKeyValueString(input?: string): Record<string, string> {
    try {
        return input ? JSON.parse(input) : {};
    } catch {
        // fallback: convert "key: value, key2: value2"
        const pairs = input?.split(",") ?? [];
        return Object.fromEntries(
            pairs.map((p) => {
                const [key, value] = p.split(":").map((s) => s.trim());
                return [key, value];
            })
        );
    }
}