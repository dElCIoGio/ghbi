import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "react-router"
import { useGetProductByHandle } from "@/hooks/shopify/products"
import { ProductContext } from "@/context/product-context"
import ProductImageGallery from "@/components/pages/shop-item/product-image-gallery"
import { ProductHeader } from "@/components/pages/product/ProductHeader"
import { ProductInfo } from "@/components/pages/product/ProductInfo"
import { ProductOptions } from "@/components/pages/product/ProductOptions"
import { ProductActions } from "@/components/pages/product/ProductActions"
import { ProductShipping } from "@/components/pages/product/ProductShipping"
import { ProductTabs } from "@/components/pages/product/ProductTabs"
import RelatedProducts from "@/components/pages/shop-item/related-products";

interface SelectedOptions {
    color: string | null
    length: string | null
    texture: string | null
    price: number
    quantityAvailable: number
}

export default function ProductPage() {
    const { productId } = useParams() as unknown as { productId: string }
    const { data: product, isLoading } = useGetProductByHandle(productId)


    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
        color: null,
        length: null,
        texture: null,
        price: product?.price ?? 0,
        quantityAvailable: product?.stockQuantity ?? 0
    })

    // Set defaults when product loads
    useEffect(() => {
        if (!product) return

        setSelectedOptions((prev) => {
            const defaultColor = prev.color ?? product.colors[0]?.value ?? null
            const defaultTexture = prev.texture ?? (
                product.textures.length > 0
                    ? (product.textures.find((texture) => texture.value === product.texture)?.value ?? product.textures[0]?.value ?? null)
                    : product.texture ?? null
            )

            if (
                prev.color === defaultColor &&
                prev.texture === defaultTexture &&
                prev.price === product.price &&
                prev.quantityAvailable === product.stockQuantity
            ) {
                return prev
            }

            return {
                ...prev,
                color: defaultColor,
                texture: defaultTexture,
                price: product.price,
                quantityAvailable: product.stockQuantity,
            }
        })
    }, [product])

    if (isLoading || !product) {
        return (
            <div className="flex flex-col">
                <div className="flex-1 py-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-square bg-muted rounded"></div>
                            <div className="space-y-4">
                                <div className="h-8 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-1/2"></div>
                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                    <div className="h-4 bg-muted rounded w-full"></div>
                                    <div className="h-4 bg-muted rounded w-3/4"></div>
                                </div>
                                <div className="h-10 bg-muted rounded w-full"></div>
                                <div className="h-10 bg-muted rounded w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <ProductContext.Provider value={{ product }}>
            <div className="flex w-full p-4 flex-col">
                <div className="flex-1">
                    <div className="py-6">
                        <ProductHeader />

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Product Images */}
                            <div>
                                <ProductImageGallery images={product.images} />
                            </div>

                            {/* Product Details */}
                            <div className="space-y-6">
                                <ProductInfo price={selectedOptions.price} />
                                <ProductOptions onOptionChange={setSelectedOptions} />
                                <ProductActions selectedOptions={selectedOptions} />
                                <ProductShipping />
                            </div>
                        </motion.div>

                        <ProductTabs />

                        {/* Related Products */}
                        <div className="mt-16 w-full hidden">
                            <RelatedProducts products={product.relatedProducts} />
                        </div>
                    </div>
                </div>
            </div>
        </ProductContext.Provider>
    )
}
