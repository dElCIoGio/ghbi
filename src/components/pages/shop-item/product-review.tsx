
import { useState } from "react"

import { motion } from "framer-motion"
import { Star, StarHalf, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ProductReview {
    id: number
    author: string
    date: string
    rating: number
    title: string
    content: string
    images?: string[]
    verified: boolean
}

interface ProductReviewsProps {
    reviews: ProductReview[]
    rating: number
    reviewCount: number
}

export default function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
    const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])

    // Calculate rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
        const count = reviews.filter((review) => Math.floor(review.rating) === stars).length
        const percentage = (count / reviews.length) * 100
        return { stars, count, percentage }
    })

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    }

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
            </div>
        )
    }

    // Handle marking review as helpful
    const handleMarkHelpful = (reviewId: number) => {
        if (helpfulReviews.includes(reviewId)) {
            setHelpfulReviews(helpfulReviews.filter((id) => id !== reviewId))
        } else {
            setHelpfulReviews([...helpfulReviews, reviewId])
        }
    }

    return (
        <div className="space-y-8">
            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="text-5xl font-bold">{rating.toFixed(1)}</div>
                    <div className="flex items-center">{renderRating(rating)}</div>
                    <div className="text-sm text-muted-foreground">Based on {reviewCount} reviews</div>
                </div>

                <div className="space-y-2">
                    {ratingDistribution.map(({ stars, count, percentage }) => (
                        <div key={stars} className="flex items-center gap-2">
                            <div className="w-12 text-sm">{stars} stars</div>
                            <Progress value={percentage} className="h-2" />
                            <div className="w-10 text-sm text-muted-foreground">{count}</div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Button className="w-full sm:w-auto">Write a Review</Button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        className="border rounded-lg p-4 space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between">
                            <div>
                                <h4 className="font-medium">{review.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    {renderRating(review.rating)}
                                    <span className="text-sm text-muted-foreground">{formatDate(review.date)}</span>
                                </div>
                            </div>
                            {review.verified && (
                                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                    Verified Purchase
                                </Badge>
                            )}
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">By {review.author}</p>
                        </div>

                        <div className="text-sm">{review.content}</div>

                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2 mt-3">
                                {review.images.map((image, index) => (
                                    <Dialog key={index}>
                                        <DialogTrigger asChild>
                                            <button className="relative h-16 w-16 overflow-hidden rounded-md border">
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Review image ${index + 1}`}
                                                    style={{objectFit: "cover", width: "100%", height: "100%"}}
                                                    className="object-cover"
                                                />
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <div className="relative aspect-square w-full">
                                                <img
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Review image ${index + 1}`}
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center gap-4 pt-2">
                            <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => handleMarkHelpful(review.id)}>
                                <ThumbsUp
                                    className={`h-4 w-4 ${helpfulReviews.includes(review.id) ? "fill-primary text-primary" : ""}`}
                                />
                                Helpful {helpfulReviews.includes(review.id) && "(1)"}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1 text-xs">
                                <MessageSquare className="h-4 w-4" />
                                Reply
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Load More Button */}
            {reviewCount > reviews.length && (
                <div className="flex justify-center pt-4">
                    <Button variant="outline">Load More Reviews</Button>
                </div>
            )}
        </div>
    )
}
