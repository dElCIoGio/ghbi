import { useGetProducts } from "@/hooks/shopify/products";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { Link } from "react-router";

function FeaturedProducts() {
    const { data: products, isLoading } = useGetProducts();


    // Filter for highlighted or sun care (SPF) products
    const featured = useMemo(() => {
        if (!products) return [];
        return products.filter(
            () => true
                // p.isHighlighted ||
                // p.name.toLowerCase().includes("spf") ||
                // (p.features && p.features.some(f => f.toLowerCase().includes("spf")))
        ).slice(0, 4); // Show up to 4 featured products
    }, [products]);

    return (
        <section className="px-4 w-full py-16 md:px-0">
            <div className="mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-center">GLOW & PROTECT</h2>
                <p className="text-muted-foreground text-center mb-10 max-w-2xl">
                    Experience sun care that nourishes, protects, and enhances your skin—effortlessly.
                </p>
                <div className="relative w-full px-4">
                    {/* Arrows (hidden for 2x2 grid) */}
                    {/* Product Cards */}
                    <div
                        className={`grid gap-8 max-w-3xl mx-auto ${
                          (featured.length === 1 || isLoading) ? 'grid-cols-1 max-w-xl' : 'grid-cols-1 sm:grid-cols-2'
                        }`}
                    >
                        {isLoading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <Card key={i}>
                                    <Skeleton className="h-48 w-full rounded-lg mb-4" />
                                    <Skeleton className="h-6 w-1/2 mb-2" />
                                    <Skeleton className="h-4 w-1/3 mb-2" />
                                    <Skeleton className="h-4 w-3/4 mb-2" />
                                    <Skeleton className="h-8 w-1/2" />
                                </Card>
                            ))
                            : featured.slice(0, 4).map(product => (
                                <Link key={product.id} to={`/shop/${product.slug}`} className="block h-full">
                                    <Card className="flex flex-col rounded-none justify-between border-none shadow-none hover:bg-zinc-100 p-0 px-0 py-0 transition-all duration-150 ease-in-out h-full">
                                        <CardHeader className="p-1">
                                            <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden bg-white">
                                                {product.images[0]?.url ? (
                                                    <img
                                                        src={product.images[0].url}
                                                        alt={product.images[0].alt || product.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <Skeleton className="w-full h-full" />
                                                )}
                                                <div className="absolute top-2 left-2 flex gap-2">
                                                    {product.isNew && <Badge variant="secondary">New</Badge>}
                                                    {product.isBestseller && <Badge>Bestseller</Badge>}
                                                </div>
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                                                <div className="flex items-center">
                                                    <span className="text-base font-bold">${product.price}</span>
                                                </div>
                                                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            {/* Optionally, add more product info or actions here */}
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                    </div>
                </div>
                <Button asChild className="mt-10 shadow-none px-8 py-3 text-base bg-zinc-100 hover:bg-zinc-200 text-black rounded-full" variant="default">
                    <Link to="shop">
                        View all
                    </Link>
                </Button>
            </div>
        </section>
    );
}

export default FeaturedProducts;