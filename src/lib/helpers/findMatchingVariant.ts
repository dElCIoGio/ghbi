import type {ShopifyVariant} from "@/lib/shopify/types";
import {useMemo} from "react";

export function findMatchingVariant(
    variants: ShopifyVariant[],
    selectedOptions: { name: string; value: string }[],
): ShopifyVariant | undefined {
    const lengthOption = selectedOptions.find(
        (option) => option.name === "Length",
    );
    if (!lengthOption) return undefined;

    return variants.find((variant) =>
        variant.selectedOptions?.some(
            (selected) =>
                selected.name === "Length" &&
                selected.value === lengthOption.value,
        ),
    );
}

export function useMatchingVariant(
    variants: ShopifyVariant[],
    selectedOptions: { name: string; value: string }[]
): ShopifyVariant | undefined {
    return useMemo(() => {
        const lengthOption = selectedOptions.find(
            (option) => option.name === "Length",
        );
        if (!lengthOption) return undefined;

        return variants.find((variant) =>
            variant.selectedOptions?.some(
                (selected) =>
                    selected.name === "Length" &&
                    selected.value === lengthOption.value,
            ),
        );
    }, [variants, selectedOptions]);
}