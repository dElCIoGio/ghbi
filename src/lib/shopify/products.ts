import shopifyClient from "@/lib/shopify/shopify-client";
import type {ShopifyProduct} from "@/lib/shopify/types";
import {mapShopifyProductToProduct} from "@/lib/helpers/mapShopifyProductToProduct";

const PRODUCTS_QUERY = `
{
  products(first: 10) {
    edges {
      node {
        id
        title
        description
        handle
        tags
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        media(first: 5) {
          edges {
            node {
              mediaContentType
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
              ... on Video {
                sources {
                  url
                  mimeType
                }
                previewImage {
                  url
                }
              }
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              sku
              price {
                amount
                currencyCode
              }
              quantityAvailable
              selectedOptions {
                name
                value
              }
            }
          }
        }

        features: metafield(namespace: "custom", key: "features") {
          value
        }
        careInstructions: metafield(namespace: "custom", key: "care_instructions") {
          value
        }
        category: metafield(namespace: "custom", key: "category") {
          value
        }
        texture: metafield(namespace: "custom", key: "texture") {
          value
        }
        specifications: metafield(namespace: "custom", key: "specifications") {
          value
        }
        highlighted: metafield(namespace: "custom", key: "highlighted") {
          value
        }
      }
    }
  }
}
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      tags
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      media(first: 5) {
        edges {
          node {
            mediaContentType
            ... on MediaImage {
              image {
                url
                altText
              }
            }
            ... on Video {
              sources {
                url
                mimeType
              }
              previewImage {
                url
              }
            }
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            sku
            price {
              amount
              currencyCode
            }
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
      features: metafield(namespace: "custom", key: "features") { value }
      careInstructions: metafield(namespace: "custom", key: "care_instructions") { value }
      category: metafield(namespace: "custom", key: "category") { value }
      texture: metafield(namespace: "custom", key: "texture") { value }
      specifications: metafield(namespace: "custom", key: "specifications") { value }
      highlighted: metafield(namespace: "custom", key: "highlighted") { value }
    }
  }
`;

export async function getProductByHandle(handle: string) {

    const response = await shopifyClient.post("", {
        query: PRODUCT_BY_HANDLE_QUERY,
        variables: { handle },
    });

    const { data, errors } = response.data;

    if (errors) throw new Error("Shopify API Error");

    return mapShopifyProductToProduct(data.productByHandle);

}

export async function getProducts() {
    const response = await shopifyClient.post("", {
        query: PRODUCTS_QUERY,
    });

    const { data, errors } = response.data;

    if (errors) throw new Error("Shopify API Error");

    const productsList: {node: ShopifyProduct}[] = data.products.edges

    return productsList.map(({ node }) => mapShopifyProductToProduct(node));

}


