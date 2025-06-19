import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProductsListingContext } from "@/context/listing-context";

// Format filter labels
const formatLabel = (str: string) => {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export function ActiveFilters() {
    const { activeFilters, priceRange, setPriceRange, toggleFilter, countActiveFilters } = useProductsListingContext();

    if (countActiveFilters() === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {activeFilters.categories.map((category) => (
                <Badge key={`badge-${category}`} variant="secondary" className="flex items-center gap-1">
                    {formatLabel(category)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("categories", category)} />
                </Badge>
            ))}
            {activeFilters.types.map((type) => (
                <Badge key={`badge-${type}`} variant="secondary" className="flex items-center gap-1">
                    {formatLabel(type)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("types", type)} />
                </Badge>
            ))}
            {activeFilters.colors.map((color) => (
                <Badge key={`badge-${color}`} variant="secondary" className="flex items-center gap-1">
                    {formatLabel(color)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("colors", color)} />
                </Badge>
            ))}
            {activeFilters.textures.map((texture) => (
                <Badge key={`badge-${texture}`} variant="secondary" className="flex items-center gap-1">
                    {formatLabel(texture)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("textures", texture)} />
                </Badge>
            ))}
            {activeFilters.lengths.map((length) => (
                <Badge key={`badge-${length}`} variant="secondary" className="flex items-center gap-1">
                    {formatLabel(length)}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFilter("lengths", length)} />
                </Badge>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                    £{priceRange[0]} - £{priceRange[1]}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 500])} />
                </Badge>
            )}
        </div>
    );
} 