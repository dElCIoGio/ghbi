import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const testimonials = [
    {
        name: "Nya Crisana",
        role: "Customer since 2025",
        content:
            "This hair is amazing. No tangles, no fuss — just like real human hair. I’ve barely touched it in two weeks and it still looks flawless.",
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        name: "Bruna Furtado",
        role: "Customer since 2024",
        content:
            "Incredible quality and lightning-fast delivery. The customer service was just as good. I’m definitely ordering again!",
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        name: "Alicia Vinhas",
        role: "Customer since 2025",
        content:
            "This wavy hair is perfect — soft, natural, and barely sheds. It blends beautifully and holds both waves and curls. I got so many compliments!",
        image: "/placeholder.svg?height=100&width=100",
    },
]
export function Testimonials() {
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-200 rounded-t-xl">
            <div className="px-4 md:px-6">
                <motion.div
                    className="mb-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold tracking-tighter mb-4">What Our Customers Say</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground">
                        Hear from women whose lives have been transformed by GHBI products.
                    </p>
                </motion.div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex flex-col items-center text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={activeTestimonial}
                            transition={{ duration: 0.5 }}
                        >
                            <blockquote className="mb-4 text-xl italic">"{testimonials[activeTestimonial].content}"</blockquote>
                            <cite className="not-italic">
                                <span className="font-bold block">{testimonials[activeTestimonial].name}</span>
                                <span className="text-muted-foreground">{testimonials[activeTestimonial].role}</span>
                            </cite>
                        </motion.div>
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === activeTestimonial ? "bg-primary" : "bg-primary/30"
                                }`}
                                aria-label={`View testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
} 