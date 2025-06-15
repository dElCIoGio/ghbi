import { useGetProducts } from "@/hooks/shopify/products";
import {type FilterState, ProductsListingContext, type ProductsListingContextProps} from "@/context/listing-context";
import { HeroBanner } from "@/components/pages/listing/hero-banner";
import { HighlightedProducts } from "@/components/pages/listing/highlighted-products";
import { Filters } from "@/components/pages/listing/filters";
import { SearchSortControls } from "@/components/pages/listing/search-sort-controls";
import { ActiveFilters } from "@/components/pages/listing/active-filters";
import { ProductGrid } from "@/components/pages/listing/product-grid";
import { Pagination } from "@/components/pages/listing/pagination";
import type {Product} from "@/types/product";
import {useCallback, useMemo, useState, useEffect} from "react";



export default function Listing() {
    const { data: products } = useGetProducts();

    return (
        <ProductsListingProvider products={products}>
            <div className="flex flex-col">
                <div className="flex-1">
                    <HeroBanner />
                    <HighlightedProducts />

                    {/* Main Product Listing */}
                    <section id="all-products" className="w-full py-8 md:py-12 bg-muted/10">
                        <div className="px-4 md:px-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <Filters />

                                {/* Product Grid and Controls */}
                                <div className="flex-1">
                                    <div className="mb-6 space-y-4">
                                        <SearchSortControls />
                                        <ActiveFilters />
                                    </div>
                                    <ProductGrid />
                                    <Pagination />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </ProductsListingProvider>
    );
}


export function ProductsListingProvider({ children, products }: { children: React.ReactNode; products: Product[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [activeFilters, setActiveFilters] = useState<FilterState>({
        categories: [],
        types: [],
        colors: [],
        textures: [],
        lengths: [],
    });
    const [sortOption, setSortOption] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const productsPerPage = 9;

    // Memoize highlighted products
    const highlightedProducts = useMemo(() =>
            products.filter((product) => product.isHighlighted),
        [products]
    );

    // Memoize filtered products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Apply search filter
        if (searchQuery) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filters
        if (activeFilters.categories.length > 0) {
            result = result.filter((product) =>
                activeFilters.categories.includes(product.category)
            );
        }

        // Apply type filters
        if (activeFilters.types.length > 0) {
            result = result.filter((product) =>
                activeFilters.types.includes(product.type)
            );
        }

        // Apply color filters
        if (activeFilters.colors.length > 0) {
            result = result.filter((product) =>
                activeFilters.colors.includes(product.colour)
            );
        }

        // Apply texture filters
        if (activeFilters.textures.length > 0) {
            result = result.filter((product) =>
                activeFilters.textures.includes(product.texture)
            );
        }

        // Apply length filters
        if (activeFilters.lengths.length > 0) {
            result = result.filter((product) =>
                activeFilters.lengths.includes(product.length)
            );
        }

        // Apply price range filter
        result = result.filter((product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply sorting
        switch (sortOption) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                break;
            case "bestselling":
                result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Featured sorting (default)
                result.sort((a, b) => {
                    if (a.isHighlighted && !b.isHighlighted) return -1;
                    if (!a.isHighlighted && b.isHighlighted) return 1;
                    return 0;
                });
        }

        return result;
    }, [products, searchQuery, activeFilters, priceRange, sortOption]);

    // Toggle filter
    const toggleFilter = useCallback((category: keyof FilterState, value: string) => {
        setActiveFilters((prev) => {
            const newFilters = { ...prev };
            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter((item) => item !== value);
            } else {
                newFilters[category] = [...newFilters[category], value];
            }
            return newFilters;
        });
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setActiveFilters({
            categories: [],
            types: [],
            colors: [],
            textures: [],
            lengths: [],
        });
        setPriceRange([0, 500]);
        setSearchQuery("");
        setSortOption("featured");
    }, []);

    // Count active filters
    const countActiveFilters = useCallback(() => {
        return (
            Object.values(activeFilters).reduce((count, filterArray) => count + filterArray.length, 0) +
            (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)
        );
    }, [activeFilters, priceRange]);

    // Set loading state
    useEffect(() => {
        if (products.length > 0) {
            setIsLoading(false);
        }
    }, [products]);

    const value: ProductsListingContextProps = {
        products,
        filteredProducts,
        highlightedProducts,
        searchQuery,
        priceRange,
        activeFilters,
        sortOption,
        currentPage,
        isLoading,
        productsPerPage,
        setSearchQuery,
        setPriceRange,
        setSortOption,
        setCurrentPage,
        toggleFilter,
        clearFilters,
        countActiveFilters,
    };

    return (
        <ProductsListingContext.Provider value={value}>
            {children}
        </ProductsListingContext.Provider>
    );
}