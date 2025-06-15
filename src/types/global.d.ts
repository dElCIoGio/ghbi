export interface RuntimeEnv {
    VITE_SHOPIFY_DOMAIN: string;
    VITE_SHOPIFY_STOREFRONT_TOKEN: string;
    VITE_SHOPIFY_API_VERSION: string;
}

declare global {
    interface Window {
        ENV: RuntimeEnv;
    }
}

