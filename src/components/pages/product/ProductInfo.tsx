import { Badge } from "@/components/ui/badge"
import { useProductContext } from "@/context/product-context"

interface ProductInfoProps {
    price?: number
}
export function ProductInfo({ price }: ProductInfoProps) {
    const { product } = useProductContext()

    const calculateDiscountedPrice = (price: number, discount?: number) => {
        if (!discount) return price
        return price * (1 - discount / 100)
    }

    const formatPrice = (price: number) => {
        return price.toFixed(2)
    }

    const displayPrice = price ?? product.price

    return (
        <div className="space-y-4">
            <div className="flex items-baseline gap-2">
                {product.discount ? (
                    <>
                        <span className="text-2xl font-bold">
                            £{formatPrice(calculateDiscountedPrice(displayPrice, product.discount))}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                            £{formatPrice(displayPrice)}
                        </span>
                        <Badge variant="outline" className="ml-2 bg-primary/10 text-primary border-primary/20">
                            {product.discount}% OFF
                        </Badge>
                    </>
                ) : (
                    <span className="text-2xl font-bold">£{formatPrice(displayPrice)}</span>
                )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>
        </div>
    )
} 