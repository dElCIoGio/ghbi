
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingBag, Heart, X, Filter, SlidersHorizontal, Star, StarHalf } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Slider } from "@/components/ui/slider.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet.tsx"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import {Link} from "react-router";
import {mockProducts, type Product} from "@/types/product.ts";


export default function Listing() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [highlightedProducts, setHighlightedProducts] = useState<Product[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [priceRange, setPriceRange] = useState([0, 500])
    const [activeFilters, setActiveFilters] = useState<{
        categories: string[]
        types: string[]
        colors: string[]
        textures: string[]
        lengths: string[]
    }>({
        categories: [],
        types: [],
        colors: [],
        textures: [],
        lengths: [],
    })
    const [sortOption, setSortOption] = useState("featured")
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 9

    // Filter options
    const filterOptions = {
        categories: ["wigs", "extensions", "bundles", "frontals", "closures"],
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
    }

    // Format filter labels
    const formatLabel = (str: string) => {
        return str
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    // Load products
    useEffect(() => {
        // Simulate loading data from an API
        setTimeout(() => {
            setProducts(mockProducts)
            setHighlightedProducts(mockProducts.filter((product) => product.isHighlighted))
            setFilteredProducts(mockProducts)
            setIsLoading(false)
        }, 1000)
    }, [])

    // Apply filters
    useEffect(() => {
        let result = [...products]

        // Apply search filter
        if (searchQuery) {
            result = result.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        // Apply category filters
        if (activeFilters.categories.length > 0) {
            result = result.filter((product) => activeFilters.categories.includes(product.category))
        }

        // Apply type filters
        if (activeFilters.types.length > 0) {
            result = result.filter((product) => activeFilters.types.includes(product.type))
        }

        // Apply color filters
        if (activeFilters.colors.length > 0) {
            result = result.filter((product) => activeFilters.colors.includes(product.colour))
        }

        // Apply texture filters
        if (activeFilters.textures.length > 0) {
            result = result.filter((product) => activeFilters.textures.includes(product.texture))
        }

        // Apply length filters
        if (activeFilters.lengths.length > 0) {
            result = result.filter((product) => activeFilters.lengths.includes(product.length))
        }

        // Apply price range filter
        result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

        // Apply sorting
        switch (sortOption) {
            case "price-low":
                result.sort((a, b) => a.price - b.price)
                break
            case "price-high":
                result.sort((a, b) => b.price - a.price)
                break
            case "newest":
                result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
                break
            case "bestselling":
                result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
                break
            case "rating":
                result.sort((a, b) => b.rating - a.rating)
                break
            default:
                // Featured sorting (default)
                result.sort((a, b) => {
                    if (a.isHighlighted && !b.isHighlighted) return -1
                    if (!a.isHighlighted && b.isHighlighted) return 1
                    return 0
                })
        }

        setFilteredProducts(result)
        setCurrentPage(1)
    }, [searchQuery, activeFilters, priceRange, sortOption, products])

    // Toggle filter
    const toggleFilter = (category: keyof typeof activeFilters, value: string) => {
        setActiveFilters((prev) => {
            const newFilters = { ...prev }
            if (newFilters[category].includes(value)) {
                newFilters[category] = newFilters[category].filter((item) => item !== value)
            } else {
                newFilters[category] = [...newFilters[category], value]
            }
            return newFilters
        })
    }

    // Clear all filters
    const clearFilters = () => {
        setActiveFilters({
            categories: [],
            types: [],
            colors: [],
            textures: [],
            lengths: [],
        })
        setPriceRange([0, 500])
        setSearchQuery("")
        setSortOption("featured")
    }

    // Count active filters
    const countActiveFilters = () => {
        return (
            Object.values(activeFilters).reduce((count, filterArray) => count + filterArray.length, 0) +
            (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0)
        )
    }

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

    // Render star ratings
    const renderRating = (rating: number) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />
                ))}
                {hasHalfStar && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                    <Star key={`empty-star-${i}`} className="h-4 w-4 text-muted-foreground" />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">({rating})</span>
            </div>
        )
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    return (
        <div className="flex flex-col">
            <div className="flex-1">
                {/* Hero Banner */}
                <section className="w-full py-8 md:py-12 bg-muted/30 relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60"></div>
                        <img
                            src="/placeholder.svg?height=400&width=1200&text=Shop%20Our%20Collection"
                            alt="Shop banner"
                            className="object-cover"
                        />
                    </div>
                    <motion.div
                        className="px-4 md:px-6 relative z-10"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Collection</h1>
                                <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed">
                                    Discover premium wigs and hair extensions designed to enhance your natural beauty
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Highlighted Products */}
                <section className="w-full py-8 md:py-12">
                    <div className="px-4 md:px-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold tracking-tight">Highlighted Products</h2>
                            <Link to="#all-products" className="text-sm font-medium text-primary hover:underline">
                                View All Products
                            </Link>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={`skeleton-${i}`} className="space-y-3">
                                        <Skeleton className="h-[200px] w-full rounded-lg" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                {highlightedProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        className="group relative overflow-hidden rounded-lg border bg-background p-2"
                                        variants={fadeIn}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="relative aspect-square overflow-hidden rounded-md">
                                            <img
                                                src={product.images[0].url || "/placeholder.svg"}
                                                alt={product.name}
                                                width={300}
                                                height={300}
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 right-2 flex flex-col gap-1">
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                                                >
                                                    <Heart className="h-4 w-4" />
                                                    <span className="sr-only">Add to wishlist</span>
                                                </Button>
                                            </div>
                                            {product.isNew && (
                                                <Badge className="absolute top-2 left-2" variant="secondary">
                                                    New
                                                </Badge>
                                            )}
                                            {product.isBestseller && (
                                                <Badge className="absolute top-2 left-2" variant="default">
                                                    Bestseller
                                                </Badge>
                                            )}
                                            {product.discount && (
                                                <Badge className="absolute bottom-2 left-2 bg-primary" variant="outline">
                                                    {product.discount}% OFF
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="pt-3 pb-2 space-y-1">
                                            <h3 className="font-medium leading-none line-clamp-1">{product.name}</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-baseline">
                                                    {product.discount ? (
                                                        <>
                              <span className="font-bold">
                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                              </span>
                                                            <span className="ml-2 text-sm text-muted-foreground line-through">
                                ${product.price.toFixed(2)}
                              </span>
                                                        </>
                                                    ) : (
                                                        <span className="font-bold">${product.price.toFixed(2)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            {renderRating(product.rating)}
                                            <div className="pt-2">
                                                <Button size="sm" className="w-full">
                                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Main Product Listing */}
                <section id="all-products" className="w-full py-8 md:py-12 bg-muted/10">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Filters - Desktop */}
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
                                                    <span>${priceRange[0]}</span>
                                                    <span>${priceRange[1]}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Accordion type="multiple" className="w-full">
                                            <AccordionItem value="category">
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

                                            <AccordionItem value="type">
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

                                            <AccordionItem value="color">
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

                                            <AccordionItem value="texture">
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

                            {/* Product Grid and Controls */}
                            <div className="flex-1">
                                <div className="mb-6 space-y-4">
                                    {/* Search and Sort Controls */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search products..."
                                                className="pl-8"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <Select value={sortOption} onValueChange={setSortOption}>
                                            <SelectTrigger className="w-full sm:w-[180px]">
                                                <SelectValue placeholder="Sort by" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="featured">Featured</SelectItem>
                                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                                <SelectItem value="newest">Newest</SelectItem>
                                                <SelectItem value="bestselling">Best Selling</SelectItem>
                                                <SelectItem value="rating">Highest Rated</SelectItem>
                                            </SelectContent>
                                        </Select>
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

                                        <div className="text-sm text-muted-foreground">{filteredProducts.length} products</div>
                                    </div>

                                    {/* Active Filters Display */}
                                    {countActiveFilters() > 0 && (
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
                                                    ${priceRange[0]} - ${priceRange[1]}
                                                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 500])} />
                                                </Badge>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Product Grid */}
                                {isLoading ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={`grid-skeleton-${i}`} className="space-y-3">
                                                <Skeleton className="h-[300px] w-full rounded-lg" />
                                                <Skeleton className="h-4 w-3/4" />
                                                <Skeleton className="h-4 w-1/2" />
                                                <Skeleton className="h-8 w-full" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        {filteredProducts.length === 0 ? (
                                            <div className="text-center py-12">
                                                <h3 className="text-lg font-medium mb-2">No products found</h3>
                                                <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                                                <Button onClick={clearFilters}>Clear All Filters</Button>
                                            </div>
                                        ) : (
                                            <motion.div
                                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                                                initial="hidden"
                                                animate="visible"
                                                variants={staggerContainer}
                                            >
                                                <AnimatePresence>
                                                    {currentProducts.map((product) => (
                                                        <motion.div
                                                            key={product.id}
                                                            className="group relative overflow-hidden rounded-lg border bg-background p-2"
                                                            variants={fadeIn}
                                                            whileHover={{ y: -5 }}
                                                            layout
                                                        >
                                                            <div className="relative aspect-square overflow-hidden rounded-md">
                                                                <Link to={product.id}>
                                                                    <img
                                                                        src={product.images[0].url || "/placeholder.svg"}
                                                                        alt={product.name}
                                                                        width={300}
                                                                        height={300}
                                                                        className="object-cover transition-transform group-hover:scale-105"
                                                                    />
                                                                </Link>

                                                                <div
                                                                    className="absolute top-2 right-2 flex flex-col gap-1">
                                                                    <Button
                                                                        size="icon"
                                                                        variant="secondary"
                                                                        className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                                                                    >
                                                                        <Heart className="h-4 w-4" />
                                                                        <span className="sr-only">Add to wishlist</span>
                                                                    </Button>
                                                                </div>
                                                                {product.isNew && (
                                                                    <Badge className="absolute top-2 left-2" variant="secondary">
                                                                        New
                                                                    </Badge>
                                                                )}
                                                                {product.isBestseller && (
                                                                    <Badge className="absolute top-2 left-2" variant="default">
                                                                        Bestseller
                                                                    </Badge>
                                                                )}
                                                                {product.discount && (
                                                                    <Badge className="text-white absolute bottom-2 left-2 bg-primary" variant="outline">
                                                                        {product.discount}% OFF
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="pt-3 pb-2 space-y-1">
                                                                <Link to={product.id}>
                                                                    <h3 className="font-medium leading-none line-clamp-1">{product.name}</h3>
                                                                </Link>
                                                                <div className="flex items-center justify-between">
                                                                <div className="flex items-baseline">
                                                                        {product.discount ? (
                                                                            <>
                                        <span className="font-bold">
                                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                        </span>
                                                                                <span className="ml-2 text-sm text-muted-foreground line-through">
                                          ${product.price.toFixed(2)}
                                        </span>
                                                                            </>
                                                                        ) : (
                                                                            <span className="font-bold">${product.price.toFixed(2)}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {renderRating(product.rating)}
                                                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                                    <span className="capitalize">{formatLabel(product.category)}</span>
                                                                    <span className="mx-1">•</span>
                                                                    <span className="capitalize">{formatLabel(product.texture)}</span>
                                                                </div>
                                                                <div className="pt-2">
                                                                    <Button size="sm" className="w-full">
                                                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                                                        Add to Cart
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}

                                        {/* Pagination */}
                                        {filteredProducts.length > 0 && (
                                            <div className="flex items-center justify-center space-x-2 py-8">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                >
                                                    Previous
                                                </Button>
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(totalPages)].map((_, i) => (
                                                        <Button
                                                            key={`page-${i + 1}`}
                                                            variant={currentPage === i + 1 ? "default" : "outline"}
                                                            size="sm"
                                                            className="w-8 h-8 p-0"
                                                            onClick={() => setCurrentPage(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
