import type {ShopifyVariant} from "@/lib/shopify/types";
import {useMemo} from "react";

export function findMatchingVariant(
    variants: ShopifyVariant[],
    selectedOptions: { name: string; value: string }[],
): ShopifyVariant | undefined {
    const normalizedOptions = selectedOptions
        .filter((option) => option.value)
        .map((option) => ({
            name: option.name.toLowerCase(),
            value: option.value,
        }));

    if (normalizedOptions.length === 0) return undefined;

    return variants.find((variant) => {
        if (!variant.selectedOptions || variant.selectedOptions.length === 0) {
            return false;
        }

        return normalizedOptions.every((option) =>
            variant.selectedOptions?.some((selected) =>
                selected.name.toLowerCase() === option.name &&
                selected.value === option.value,
            ),
        );
    });
}

export function useMatchingVariant(
    variants: ShopifyVariant[],
    selectedOptions: { name: string; value: string }[],
): ShopifyVariant | undefined {
    return useMemo(() => {
        const normalizedOptions = selectedOptions
            .filter((option) => option.value)
            .map((option) => ({
                name: option.name.toLowerCase(),
                value: option.value,
            }));

        if (normalizedOptions.length === 0) return undefined;

        return variants.find((variant) => {
            if (!variant.selectedOptions || variant.selectedOptions.length === 0) {
                return false;
            }

            return normalizedOptions.every((option) =>
                variant.selectedOptions?.some((selected) =>
                    selected.name.toLowerCase() === option.name &&
                    selected.value === option.value,
                ),
            );
        });
    }, [variants, selectedOptions]);
}
