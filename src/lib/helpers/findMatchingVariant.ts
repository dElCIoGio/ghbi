import type {ShopifyVariant} from "@/lib/shopify/types";
import {useMemo} from "react";

export function findMatchingVariant(variants: ShopifyVariant[], selectedOptions: {
    name: string;
    value: string
}[]): ShopifyVariant | undefined {
    return variants.find(variant => {
        if (!variant.selectedOptions) return undefined;

        return selectedOptions.every(option =>
            variant.selectedOptions?.some(selected =>
                selected.name === option.name && selected.value === option.value
            )
        );
    });
}

export function useMatchingVariant(
    variants: ShopifyVariant[],
    selectedOptions: { name: string; value: string }[]
): ShopifyVariant | undefined {
    return useMemo(() => {
        return variants.find(variant => {
            if (!variant.selectedOptions) return undefined;

            return selectedOptions.every(option =>
                variant.selectedOptions?.some(selected =>
                    selected.name === option.name && selected.value === option.value
                )
            );
        });
    }, [variants, selectedOptions]);
}