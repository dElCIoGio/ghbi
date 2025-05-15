
import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import type { ProductImage } from "@/types/product"

interface ProductImageGalleryProps {
    images: ProductImage[]
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
    const [isZooming, setIsZooming] = useState(false)
    const isMobile = useIsMobile()

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index)
    }

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZooming) return

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setZoomPosition({ x, y })
    }

    const activeImage = images[activeIndex]

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-full w-full"
                    >
                        {activeImage.isVideo ? (
                            <div className="relative h-full w-full bg-muted flex items-center justify-center">
                                <img
                                    src={activeImage.url || "/placeholder.svg"}
                                    alt={activeImage.alt}
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="rounded-full bg-primary/90 p-4">
                                        <Play className="h-8 w-8 text-white" fill="white" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div
                                        className="relative h-full w-full cursor-zoom-in"
                                        onMouseMove={handleMouseMove}
                                        onMouseEnter={() => setIsZooming(true)}
                                        onMouseLeave={() => setIsZooming(false)}
                                    >
                                        <img
                                            src={activeImage.url || "/placeholder.svg"}
                                            alt={activeImage.alt}
                                            className={`object-cover transition-transform duration-200 ${
                                                isZooming && !isMobile ? "scale-125" : ""
                                            }`}
                                            style={
                                                isZooming && !isMobile
                                                    ? {
                                                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                                    }
                                                    : undefined
                                            }
                                        />
                                        <div className="absolute bottom-4 right-4 rounded-full bg-background/80 p-2 backdrop-blur-sm">
                                            <ZoomIn className="h-5 w-5" />
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                    <div className="relative aspect-square w-full">
                                        <img
                                            src={activeImage.url || "/placeholder.svg"}
                                            alt={activeImage.alt}
                                            className="object-contain"
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={handlePrevious}
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={handleNext}
                >
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border transition-all ${
                            activeIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <img src={image.url || "/placeholder.svg"} alt={image.alt} className="object-cover" />
                        {image.isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Play className="h-6 w-6 text-white" fill="white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
