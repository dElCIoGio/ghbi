import { createContext, useContext } from "react";
import { type Product } from "@/types/product";

export type FilterState = {
    categories: string[];
    types: string[];
    colors: string[];
    textures: string[];
    lengths: string[];
};

export type ProductsListingContextProps = {
    // State
    products: Product[];
    filteredProducts: Product[];
    highlightedProducts: Product[];
    searchQuery: string;
    priceRange: [number, number];
    activeFilters: FilterState;
    sortOption: string;
    currentPage: number;
    isLoading: boolean;
    productsPerPage: number;

    // Actions
    setSearchQuery: (query: string) => void;
    setPriceRange: (range: [number, number]) => void;
    setSortOption: (option: string) => void;
    setCurrentPage: (page: number) => void;
    toggleFilter: (category: keyof FilterState, value: string) => void;
    clearFilters: () => void;
    countActiveFilters: () => number;
};

export const ProductsListingContext = createContext<ProductsListingContextProps | undefined>(undefined);

export function useProductsListingContext() {
    const context = useContext(ProductsListingContext);

    if (!context) {
        throw new Error("useProductsListingContext must be used within a ProductsListingProvider");
    }

    return context;
}
