import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { useProductsListingContext } from "@/context/listing-context";

// Filter options
const filterOptions = {
    categories: ["extensions", "bundles", "frontals", "closures"],
    types: [
        "lace-front",
        "full-lace",
        "closure",
        "clip-in",
        "tape-in",
        "with-closure",
        "bundles-only",
        "halo",
        "lace-frontal",
        "hd-lace",
        "pixie-cut",
        "bob",
        "micro-link",
    ],
    colors: ["black", "brown", "blonde", "ombre", "natural-black", "colored"],
    textures: ["straight", "wavy", "curly", "deep-wave", "kinky-curly", "loose-wave"],
    lengths: ["short", "medium", "long"],
};

// Format filter labels
const formatLabel = (str: string) => {
    return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export function Filters() {
    const {
        priceRange,
        setPriceRange,
        activeFilters,
        toggleFilter,
        clearFilters,
        countActiveFilters,
    } = useProductsListingContext();

    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden md:block w-64 shrink-0">
                <div className="sticky top-24 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </h3>
                        {countActiveFilters() > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                Clear All
                            </Button>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Price Range</h4>
                            <div className="px-2">
                                <Slider
                                    defaultValue={[0, 500]}
                                    max={500}
                                    step={10}
                                    value={priceRange}
                                    onValueChange={setPriceRange}
                                />
                                <div className="flex items-center justify-between mt-2 text-sm">
                                    <span>£{priceRange[0]}</span>
                                    <span>£{priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        <Accordion type="multiple" className="w-full">
                            <AccordionItem className="hidden" value="category">
                                <AccordionTrigger>Category</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {filterOptions.categories.map((category) => (
                                            <div key={category} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`category-${category}`}
                                                    checked={activeFilters.categories.includes(category)}
                                                    onCheckedChange={() => toggleFilter("categories", category)}
                                                />
                                                <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                                                    {formatLabel(category)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className="hidden" value="type">
                                <AccordionTrigger>Type</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {filterOptions.types.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`type-${type}`}
                                                    checked={activeFilters.types.includes(type)}
                                                    onCheckedChange={() => toggleFilter("types", type)}
                                                />
                                                <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                                                    {formatLabel(type)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className="hidden" value="color">
                                <AccordionTrigger>Color</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {filterOptions.colors.map((color) => (
                                            <div key={color} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`color-${color}`}
                                                    checked={activeFilters.colors.includes(color)}
                                                    onCheckedChange={() => toggleFilter("colors", color)}
                                                />
                                                <Label htmlFor={`color-${color}`} className="text-sm font-normal">
                                                    {formatLabel(color)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem className="hidden" value="texture">
                                <AccordionTrigger>Texture</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {filterOptions.textures.map((texture) => (
                                            <div key={texture} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`texture-${texture}`}
                                                    checked={activeFilters.textures.includes(texture)}
                                                    onCheckedChange={() => toggleFilter("textures", texture)}
                                                />
                                                <Label htmlFor={`texture-${texture}`} className="text-sm font-normal">
                                                    {formatLabel(texture)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="length">
                                <AccordionTrigger>Length</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        {filterOptions.lengths.map((length) => (
                                            <div key={length} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`length-${length}`}
                                                    checked={activeFilters.lengths.includes(length)}
                                                    onCheckedChange={() => toggleFilter("lengths", length)}
                                                />
                                                <Label htmlFor={`length-${length}`} className="text-sm font-normal">
                                                    {formatLabel(length)}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex md:hidden items-center justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                            {countActiveFilters() > 0 && (
                                <Badge className="ml-2" variant="secondary">
                                    {countActiveFilters()}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                            <SheetDescription>Refine your product search with filters</SheetDescription>
                        </SheetHeader>
                        <div className="py-4">
                            {countActiveFilters() > 0 && (
                                <Button variant="ghost" size="sm" onClick={clearFilters} className="mb-4">
                                    Clear All Filters
                                </Button>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Price Range</h4>
                                    <div className="px-2">
                                        <Slider
                                            defaultValue={[0, 500]}
                                            max={500}
                                            step={10}
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                        />
                                        <div className="flex items-center justify-between mt-2 text-sm">
                                            <span>${priceRange[0]}</span>
                                            <span>${priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                <Accordion type="multiple" className="w-full">
                                    <AccordionItem value="category-mobile">
                                        <AccordionTrigger>Category</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2">
                                                {filterOptions.categories.map((category) => (
                                                    <div key={`mobile-${category}`} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`mobile-category-${category}`}
                                                            checked={activeFilters.categories.includes(category)}
                                                            onCheckedChange={() => toggleFilter("categories", category)}
                                                        />
                                                        <Label htmlFor={`mobile-category-${category}`} className="text-sm font-normal">
                                                            {formatLabel(category)}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="type-mobile">
                                        <AccordionTrigger>Type</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2">
                                                {filterOptions.types.map((type) => (
                                                    <div key={`mobile-${type}`} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`mobile-type-${type}`}
                                                            checked={activeFilters.types.includes(type)}
                                                            onCheckedChange={() => toggleFilter("types", type)}
                                                        />
                                                        <Label htmlFor={`mobile-type-${type}`} className="text-sm font-normal">
                                                            {formatLabel(type)}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="color-mobile">
                                        <AccordionTrigger>Color</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2">
                                                {filterOptions.colors.map((color) => (
                                                    <div key={`mobile-${color}`} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`mobile-color-${color}`}
                                                            checked={activeFilters.colors.includes(color)}
                                                            onCheckedChange={() => toggleFilter("colors", color)}
                                                        />
                                                        <Label htmlFor={`mobile-color-${color}`} className="text-sm font-normal">
                                                            {formatLabel(color)}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="texture-mobile">
                                        <AccordionTrigger>Texture</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2">
                                                {filterOptions.textures.map((texture) => (
                                                    <div key={`mobile-${texture}`} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`mobile-texture-${texture}`}
                                                            checked={activeFilters.textures.includes(texture)}
                                                            onCheckedChange={() => toggleFilter("textures", texture)}
                                                        />
                                                        <Label htmlFor={`mobile-texture-${texture}`} className="text-sm font-normal">
                                                            {formatLabel(texture)}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="length-mobile">
                                        <AccordionTrigger>Length</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2">
                                                {filterOptions.lengths.map((length) => (
                                                    <div key={`mobile-${length}`} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`mobile-length-${length}`}
                                                            checked={activeFilters.lengths.includes(length)}
                                                            onCheckedChange={() => toggleFilter("lengths", length)}
                                                        />
                                                        <Label htmlFor={`mobile-length-${length}`} className="text-sm font-normal">
                                                            {formatLabel(length)}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <SheetClose asChild>
                                <Button>Apply Filters</Button>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
} 