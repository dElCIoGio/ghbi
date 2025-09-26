import type {Product, RelatedProduct} from "@/types/product";
import {useEffect, useState} from "react";
import shopifyClient from "@/lib/shopify/shopify-client";

interface ShopifyImageNode {
    url: string;
    altText: string | null;
}

interface ShopifyProductNode {
    id: string;
    title: string;
    handle: string;
    tags: string[];
    images: {
        edges: { node: ShopifyImageNode }[];
    };
    metafield: {
        value: string;
    } | null;
}

interface ShopifyGraphQLResponse {
    data: {
        products: {
            edges: {
                node: ShopifyProductNode;
            }[];
        };
    };
}

export function useRelatedProducts(product: Product) {
    const [related, setRelated] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!product) return;

        const fetchRelated = async () => {
            setLoading(true);

            const query = `
        query GetRelatedProducts($query: String!) {
          products(first: 12, query: $query) {
            edges {
              node {
                id
                title
                handle
                tags
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                metafield(namespace: "custom", key: "texture") {
                  value
                }
              }
            }
          }
        }
      `;

            const variables = {
                query: `metafield:custom.category:${product.category}`,
            };

            try {
                const response = await shopifyClient.post<ShopifyGraphQLResponse>("", {
                    query,
                    variables,
                });

                const nodes = response.data.data.products.edges.map(edge => edge.node);

                const filtered = nodes
                    .filter(p => p.handle !== product.slug)
                    .sort((a, b) => {
                        let scoreA = 0;
                        let scoreB = 0;

                        if (a.metafield?.value === product.texture) scoreA += 1;
                        if (b.metafield?.value === product.texture) scoreB += 1;

                        const commonTagsA = a.tags.filter(tag => product.features.includes(tag)).length;
                        const commonTagsB = b.tags.filter(tag => product.features.includes(tag)).length;

                        scoreA += commonTagsA;
                        scoreB += commonTagsB;

                        return scoreB - scoreA;
                    });

                const relatedProducts: RelatedProduct[] = filtered.slice(0, 4).map(p => ({
                    id: p.id,
                    name: p.title,
                    slug: p.handle,
                    image: p.images.edges[0]?.node.url ?? "",
                    rating: 4.5, // Placeholder
                    reviewCount: 0, // Placeholder
                    price: 0, // Optional: fetch variant price in extended query
                }));

                setRelated(relatedProducts);
            } catch (error) {
                console.error("Failed to fetch related products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelated();
    }, [product]);

    return { related, loading };
}
