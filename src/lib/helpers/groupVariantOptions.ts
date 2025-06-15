import type {Edge, ShopifyVariant} from "@/lib/shopify/types";

type VariantOptionGroup = Record<string, string[]>;

export function groupVariantOptions(variants: Edge<ShopifyVariant>[]): VariantOptionGroup {
    const groups: VariantOptionGroup = {};

    for (const edge of variants) {
        const variant = edge.node;

        if (!variant.selectedOptions) continue;

        for (const opt of variant.selectedOptions) {
            const name = opt.name.toLowerCase();
            if (!groups[name]) groups[name] = [];
            if (!groups[name].includes(opt.value)) {
                groups[name].push(opt.value);
            }
        }
    }

    return groups;
}
