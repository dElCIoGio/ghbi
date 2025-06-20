import { motion } from "framer-motion"
import { Heart, Shield, Users } from "lucide-react"

export function MissionSection() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    return (
        <section id="our-mission" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="px-4 md:px-6">
                <motion.div
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                            At GlossyHairByIsis, we believe that every woman deserves to feel confident and beautiful in her own skin. Our
                            mission is to empower women through high-quality hair products that enhance their natural beauty and
                            allow them to express themselves authentically.
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div
                        className="flex flex-col items-center space-y-4 text-center"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                    >
                        <div className="rounded-full bg-primary/10 p-4">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Quality</h3>
                        <p className="text-sm text-muted-foreground">
                            We source only the finest materials and maintain rigorous quality control to ensure our products
                            exceed expectations.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center space-y-4 text-center"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                    >
                        <div className="rounded-full bg-primary/10 p-4">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Inclusivity</h3>
                        <p className="text-sm text-muted-foreground">
                            We create products for women of all backgrounds, hair types, and styles, celebrating diversity in all
                            its forms.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center space-y-4 text-center"
                        variants={fadeIn}
                        whileHover={{ y: -5 }}
                    >
                        <div className="rounded-full bg-primary/10 p-4">
                            <Heart className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">Confidence</h3>
                        <p className="text-sm text-muted-foreground">
                            We believe in helping women feel confident and empowered through products that enhance their natural
                            beauty.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
} 