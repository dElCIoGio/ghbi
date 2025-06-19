import { Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProductContext } from "@/context/product-context"
import ProductReviews from "@/components/pages/shop-item/product-review"

export function ProductTabs() {
    const { product } = useProductContext()

    return (
        <div className="mt-12">
            <Tabs defaultValue="features" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="care">Care Instructions</TabsTrigger>
                    <TabsTrigger className="hidden" value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative hidden aspect-video rounded-lg overflow-hidden">
                            <img
                                src="/placeholder.svg?height=400&width=600&text=Product%20Features"
                                alt="Product features"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="specifications" className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {Object.entries(product.specifications).map(([key, value], index) => (
                            <div key={index} className="flex justify-between py-2 border-b">
                                <span className="font-medium">{key}</span>
                                <span className="text-muted-foreground">{value}</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="care" className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Care Instructions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <ul className="space-y-3">
                                {product.careInstructions.map((instruction, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span>{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative hidden aspect-video rounded-lg overflow-hidden">
                            <img
                                src="/placeholder.svg?height=400&width=600&text=Care%20Instructions"
                                alt="Care instructions"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="reviews" className="pt-6">
                    <ProductReviews reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
                </TabsContent>
            </Tabs>
        </div>
    )
} 