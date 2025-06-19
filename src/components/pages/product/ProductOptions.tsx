import { Check } from "lucide-react"
import { useProductContext } from "@/context/product-context"
import { useState, useMemo } from "react"
import { useMatchingVariant } from "@/lib/helpers/findMatchingVariant"

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
    const [selectedTexture, ] = useState<string | null>(null)

    const selectedOptions = useMemo(() => {
        const options = []
        if (selectedColor) options.push({ name: 'Color', value: selectedColor })
        if (selectedLength) options.push({ name: 'Length', value: selectedLength })
        if (selectedTexture) options.push({ name: 'Texture', value: selectedTexture })
        return options
    }, [selectedColor, selectedLength, selectedTexture])

    const matchingVariant = useMatchingVariant(product.variants, selectedOptions)

    const currentPrice = useMemo(() => {
        if (!matchingVariant) return product.price
        return Number(matchingVariant.price.amount)
    }, [matchingVariant, product.price])

    const quantityAvailable = useMemo(() => {
        if (!matchingVariant) return 0
        return matchingVariant.quantityAvailable
    }, [matchingVariant])

    const handleColorChange = (colorValue: string) => {
        setSelectedColor(colorValue)
        onOptionChange({
            color: colorValue,
            length: selectedLength,
            texture: selectedTexture,
            price: currentPrice,
            quantityAvailable
        })
    }

    const handleLengthChange = (lengthValue: string) => {
        setSelectedLength(lengthValue)
        onOptionChange({
            color: selectedColor,
            length: lengthValue,
            texture: selectedTexture,
            price: currentPrice,
            quantityAvailable
        })
    }

    return (
        <div className="space-y-4">
            {/* Color Selection */}
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

        </div>
    )
} 