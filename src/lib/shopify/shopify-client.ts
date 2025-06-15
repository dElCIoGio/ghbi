
import axios from "axios";
import {getEnv} from "@/lib/get-env";


const {
    SHOPIFY_API_VERSION,
    SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_TOKEN
} = getEnv()

const shopifyClient = axios.create({
    baseURL: `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
});


export default shopifyClient;
