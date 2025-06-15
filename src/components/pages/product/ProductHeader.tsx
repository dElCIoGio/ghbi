import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useProductContext } from "@/context/product-context"
import { Star, StarHalf } from "lucide-react"

export function ProductHeader() {
    const { product } = useProductContext()

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
            </div>
        )
    }

    return (
        <div className="space-y-6 mb-4">
            <Breadcrumb className="mb-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/shop/wigs">Wigs</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink>{product.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>
                <div className="flex items-center gap-2 mb-2">
                    {product.isNew && <Badge variant="secondary">New</Badge>}
                    {product.isBestseller && <Badge>Bestseller</Badge>}
                    {product.stockStatus === "low_stock" && (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                            Low Stock
                        </Badge>
                    )}
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    {renderRating(product.rating)}
                    <span className="text-sm text-muted-foreground">
                        ({product.rating}) · {product.reviewCount} reviews
                    </span>
                </div>
            </div>
        </div>
    )
} 