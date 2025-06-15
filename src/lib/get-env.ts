
type Env = {
    SHOPIFY_DOMAIN: string;
    SHOPIFY_STOREFRONT_TOKEN: string;
    SHOPIFY_API_VERSION: string
};

export const getEnv = (): Env => {

    try {
        const isProd = import.meta.env.MODE === 'production';

        if (isProd && typeof window !== 'undefined' && window.ENV) {
            return {
                SHOPIFY_API_VERSION: window.ENV.VITE_SHOPIFY_API_VERSION,
                SHOPIFY_DOMAIN: window.ENV.VITE_SHOPIFY_DOMAIN,
                SHOPIFY_STOREFRONT_TOKEN: window.ENV.VITE_SHOPIFY_STOREFRONT_TOKEN,
            } as Env;
        }

    } catch {
        return {
            SHOPIFY_API_VERSION: import.meta.env.VITE_SHOPIFY_API_VERSION,
            SHOPIFY_DOMAIN: import.meta.env.VITE_SHOPIFY_DOMAIN,
            SHOPIFY_STOREFRONT_TOKEN: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
        };
    }

    return {
        SHOPIFY_API_VERSION: import.meta.env.VITE_SHOPIFY_API_VERSION,
        SHOPIFY_DOMAIN: import.meta.env.VITE_SHOPIFY_DOMAIN,
        SHOPIFY_STOREFRONT_TOKEN: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
    };
};