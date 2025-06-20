import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "@/assets/89B8DFC3-E44A-4587-A7D6-2028A7D574B4.jpeg"

export function Beginning() {
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
                    className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div variants={fadeIn} className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-full -z-10"></div>
                        <img
                            src={Image}
                            alt="Founder of Glossy Hair By Isis"
                            width={600}
                            height={600}
                            className="mx-auto aspect-square overflow-hidden z-0 rounded-xl object-cover object-center sm:w-full shadow-lg"
                        />
                    </motion.div>
                    <motion.div className="space-y-6" variants={fadeIn}>
                        <h2 className="text-3xl font-bold tracking-tighter">The Beginning</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed">
                            Glossy Hair By Isis was born from a personal journey. After struggling to find high-quality hair
                            extensions that matched her texture and color, our founder Isis decided to create her own solution.
                            What started as a personal quest quickly evolved into a mission to help other women feel confident and
                            beautiful.
                        </p>
                        <p className="text-muted-foreground md:text-lg/relaxed">
                            In 2024, GlossyHairByIsis launched with a small collection of premium hair extensions. Today, we've grown into
                            a beloved brand that serves thousands of women worldwide, helping them express their unique beauty
                            through versatile, high-quality hair products.
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Our Growth Journey</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">
                                        From a small home-based business to an international brand, our journey has been incredible. We
                                        started with just an incredible idea and now offer offer over 4 different options to suit every woman's
                                        unique style and needs.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Our Production Process</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">
                                        We work with ethical suppliers who share our values. Each product goes through a rigorous
                                        quality control process before it reaches our customers. We believe in transparency and
                                        sustainability at every step.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
} 