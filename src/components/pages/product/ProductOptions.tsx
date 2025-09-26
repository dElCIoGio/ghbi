import { Check } from "lucide-react"
import { useProductContext } from "@/context/product-context"
import { useState, useMemo, useEffect } from "react"
import { useMatchingVariant } from "@/lib/helpers/findMatchingVariant"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ProductOptionsProps {
    onOptionChange: (options: {
        color: string | null
        length: string | null
        texture: string | null
        price: number
        quantityAvailable: number
    }) => void
}

export function ProductOptions({ onOptionChange }: ProductOptionsProps) {
    const { product } = useProductContext()

    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [selectedLength, setSelectedLength] = useState<string | null>(null)
    const [selectedTexture, setSelectedTexture] = useState<string | null>(null)


    const selectedOptions = useMemo(() => {
        const options: { name: string; value: string }[] = []
        if (selectedLength) options.push({ name: "Length", value: selectedLength })
        if (selectedColor) options.push({ name: "Color", value: selectedColor })
        if (selectedTexture) options.push({ name: "Texture", value: selectedTexture })
        return options
    }, [selectedLength, selectedColor, selectedTexture])

    const matchingVariant = useMatchingVariant(product.variants, selectedOptions)

    const currentPrice = useMemo(() => {
        if (!matchingVariant) return product.price
        return Number(matchingVariant.price.amount)
    }, [product.price, matchingVariant])

    const quantityAvailable = useMemo(() => {
        if (!matchingVariant) return product.stockQuantity
        return matchingVariant.quantityAvailable
    }, [matchingVariant, product.stockQuantity])

    // Set default color when product loads
    useEffect(() => {
        if (!selectedColor && product.colors.length > 0) {
            setSelectedColor(product.colors[0].value)
        }
    }, [product, selectedColor])

    // Set default texture when product loads
    useEffect(() => {
        if (selectedTexture) return

        let defaultTexture: string | null = null

        if (product.textures.length > 0) {
            const matchedInStockTexture = product.textures.find(
                (texture) => texture.value === product.texture && texture.inStock,
            )

            if (matchedInStockTexture) {
                defaultTexture = matchedInStockTexture.value
            } else {
                const firstAvailableTexture = product.textures.find((texture) => texture.inStock)
                defaultTexture = firstAvailableTexture?.value ?? product.textures[0]?.value ?? null
            }
        } else if (product.texture) {
            defaultTexture = product.texture
        }

        if (defaultTexture) {
            setSelectedTexture(defaultTexture)
        }
    }, [product, selectedTexture])

    useEffect(() => {
        onOptionChange({
            color: selectedColor,
            length: selectedLength,
            texture: selectedTexture,
            price: currentPrice,
            quantityAvailable,
        })
    }, [selectedColor, selectedLength, selectedTexture, currentPrice, quantityAvailable, onOptionChange])

    const handleColorChange = (colorValue: string) => {
        setSelectedColor(colorValue)
    }

    const handleLengthChange = (lengthValue: string) => {
        setSelectedLength(lengthValue)
    }

    const handleTextureChange = (textureValue: string) => {
        setSelectedTexture(textureValue)
    }

    return (
        <div className="space-y-4">
            {/* Color Selection */}

            {product.colors.length > 1 && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Color</span>
                        {selectedColor && (
                            <span className="text-sm text-muted-foreground">
                                {selectedColor}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                            <button
                                key={color.id}
                                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                                    !color.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-110"
                                } ${selectedColor === color.value ? "border-primary ring-2 ring-primary/20" : "border-muted"}`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => color.inStock && handleColorChange(color.value)}
                                disabled={!color.inStock}
                                aria-label={color.name}
                            >
                                {selectedColor === color.value && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <Check className="h-5 w-5 text-white drop-shadow-md" />
                                    </span>
                                )}
                                {!color.inStock && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-0.5 bg-muted-foreground/70 rotate-45 rounded-full" />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Length Selection */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Length</span>
                    {selectedLength && (
                        <span className="text-sm text-muted-foreground">
                            {selectedLength}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {product.lengths.map((length) => (
                        <button
                            key={length.id}
                            className={`px-4 py-2 rounded-md border transition-all ${
                                !length.inStock ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50"
                            } ${selectedLength === length.value ? "border-primary bg-primary/5" : "border-muted"}`}
                            onClick={() => length.inStock && handleLengthChange(length.value)}
                            disabled={!length.inStock}
                        >
                            {length.value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Texture Selection */}
            {product.textures.length > 0 && (
                <div className="space-y-2">
                    <span className="font-medium">Texture</span>
                    <Select
                        value={selectedTexture ?? undefined}
                        onValueChange={handleTextureChange}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a texture" />
                        </SelectTrigger>
                        <SelectContent>
                            {product.textures.map((texture) => (
                                <SelectItem
                                    key={texture.id}
                                    value={texture.value}
                                    disabled={!texture.inStock}
                                >
                                    {texture.name ?? texture.value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

        </div>
    )
}
