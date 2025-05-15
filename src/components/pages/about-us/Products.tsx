import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Products() {
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
                    className="mb-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Products</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground">
                        Discover our range of premium wigs and hair extensions, designed to enhance your natural beauty.
                    </p>
                </motion.div>

                <Tabs defaultValue="wigs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="wigs">Wigs</TabsTrigger>
                        <TabsTrigger value="extensions">Extensions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="wigs" className="space-y-4">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {[1, 2, 3].map((item) => (
                                <motion.div
                                    key={`wig-${item}`}
                                    className="group relative overflow-hidden rounded-lg"
                                    variants={fadeIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <img
                                        src={`/placeholder.svg?height=400&width=300&text=Wig%20${item}`}
                                        alt={`Wig style ${item}`}
                                        width={300}
                                        height={400}
                                        className="w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <div>
                                            <h3 className="font-medium text-lg">Premium Wig Style {item}</h3>
                                            <p className="text-sm text-muted-foreground">Natural look and feel</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                    <TabsContent value="extensions" className="space-y-4">
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {[1, 2, 3].map((item) => (
                                <motion.div
                                    key={`extension-${item}`}
                                    className="group relative overflow-hidden rounded-lg"
                                    variants={fadeIn}
                                    whileHover={{ y: -5 }}
                                >
                                    <img
                                        src={`/placeholder.svg?height=400&width=300&text=Extension%20${item}`}
                                        alt={`Hair extension style ${item}`}
                                        width={300}
                                        height={400}
                                        className="w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <div>
                                            <h3 className="font-medium text-lg">Luxury Extension {item}</h3>
                                            <p className="text-sm text-muted-foreground">Seamless blend with natural hair</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
} 