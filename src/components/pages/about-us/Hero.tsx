import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { BlackWomanBeigeBackground } from "@/assets"

export function Hero() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60"></div>
                <img
                    src={BlackWomanBeigeBackground}
                    alt="Elegant hair styling background"
                    className="object-cover"
                />
            </div>
            <motion.div
                className="px-4 md:px-6 relative z-10"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Story</h1>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
                            Empowering women through quality hair products since 2018
                        </p>
                    </div>
                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="mt-4" size="lg" asChild>
                            <a href="#our-mission">
                                Discover Our Mission
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
} 