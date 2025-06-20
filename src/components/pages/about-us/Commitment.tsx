import { motion } from "framer-motion"
import img1 from "@/assets/Facetune_18-05-2025-11-57-01.jpg"
import img2 from "@/assets/IMG_9479.jpg"
import img3 from "@/assets/6E06703D-A535-44BA-BEE6-BBC6E2660E95.jpeg"
import img4 from "@/assets/61BB0B2D-3875-4A61-BE4F-19591162AA37.jpg"



export function Commitment() {
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
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="px-4 md:px-6">
                <motion.div
                    className="grid gap-10 lg:grid-cols-2 lg:gap-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div className="space-y-6" variants={fadeIn}>
                        <h2 className="text-3xl font-bold tracking-tighter">Our Commitment</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed">
                            At GlossyHairByIsis, we're committed to more than just selling hair products. We're dedicated to creating a
                            community where women can feel supported, inspired, and empowered.
                        </p>
                        <p className="text-muted-foreground md:text-lg/relaxed">
                            We believe in ethical sourcing, sustainable practices, and giving back to communities that support us.
                            A portion of every purchase goes toward initiatives that support women's education and
                            entrepreneurship.
                        </p>
                        <p className="text-muted-foreground md:text-lg/relaxed">
                            When you choose GlossyHairByIsis, you're not just getting a product – you're joining a movement of women who
                            believe in lifting each other up and celebrating each other's unique beauty.
                        </p>
                    </motion.div>
                    <motion.div className="grid grid-cols-2 gap-4" variants={staggerContainer}>
                        <motion.div variants={fadeIn} whileHover={{ y: -5 }}>
                            <img
                                src={img1}
                                alt="GHBI Product Showcase"
                                width={300}
                                height={300}
                                className="aspect-square overflow-hidden rounded-xl object-cover object-center shadow-md"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn} whileHover={{ y: -5 }}>
                            <img
                                src={img2}
                                alt="GHBI Customer"
                                width={300}
                                height={300}
                                className="aspect-square overflow-hidden rounded-xl object-cover object-center shadow-md"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn} whileHover={{ y: -5 }}>
                            <img
                                src={img3}
                                alt="GHBI Workshop"
                                width={300}
                                height={300}
                                className="aspect-square overflow-hidden rounded-xl object-cover object-center shadow-md"
                            />
                        </motion.div>
                        <motion.div variants={fadeIn} whileHover={{ y: -5 }}>
                            <img
                                src={img4}
                                alt="GHBI Team"
                                width={300}
                                height={300}
                                className="aspect-square overflow-hidden rounded-xl object-cover object-center shadow-md"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
} 