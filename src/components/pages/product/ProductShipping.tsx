import { Truck, RotateCcw, Shield } from "lucide-react"
import { useProductContext } from "@/context/product-context"

export function ProductShipping() {
    const { product } = useProductContext()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                    <h4 className="font-medium text-sm">Free Shipping</h4>
                    <p className="text-xs text-muted-foreground">On orders over $150</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                    <h4 className="font-medium text-sm">30-Day Returns</h4>
                    <p className="text-xs text-muted-foreground">Satisfaction guaranteed</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                    <h4 className="font-medium text-sm">Secure Checkout</h4>
                    <p className="text-xs text-muted-foreground">Safe & protected</p>
                </div>
            </div>
            <div className="pt-2">
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
            </div>
        </div>
    )
} 