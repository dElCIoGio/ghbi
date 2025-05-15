import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="px-4 md:px-6">
                <motion.div
                    className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
                            <p className="text-muted-foreground mb-6">
                                Stay updated with our latest products, styling tips, and exclusive offers.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Input type="email" placeholder="Enter your email" className="flex-1" />
                                <Button>Subscribe</Button>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-auto">
                            <img
                                src="/placeholder.svg?height=400&width=400&text=Join%20Us"
                                alt="Newsletter signup"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
} 