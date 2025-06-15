import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Users, Heart } from "lucide-react"
import { TwoBlackWomen } from "@/assets"

function LandingPage() {
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
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="w-full flex flex-col justify-center relative bg-white overflow-hidden h-screen">
                <div className="absolute rounded-b-xl inset-0 z-0">
                    <img
                        src={TwoBlackWomen}
                        alt="Elegant hair styling background"
                        className="object-cover w-full h-full rounded-b-xl rounded-br-full bg-white object-right md:object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r rounded-b-xl rounded-br-full from-black/20 via-black/20 to-black/20" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full h-full px-4 md:px-16 py-12 gap-8">
                    {/* Left: Text and Card */}
                    <div className="flex-1 flex flex-col justify-center items-start max-w-xl w-full space-y-6">
                        {/* Tags */}
                        <div className="flex gap-2 mb-2">
                            <span className="bg-primary/10 text-white text-xs font-medium rounded-full px-3 py-1">WIGS</span>
                            <span className="bg-primary/10 text-white text-xs font-medium rounded-full px-3 py-1">HAIR CARE</span>
                            <span className="bg-primary/10 text-white text-xs font-medium rounded-full px-3 py-1">NEW ARRIVAL</span>
                        </div>
                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight text-white font-inter text-left">
                            Glow Naturally with GHBI Signature Wigs
                        </h1>
                        {/* Description */}
                        <p className="text-white bg font-poppins text-base md:text-lg lg:text-sm text-left max-w-md">
                            Our premium wigs and extensions are crafted to enhance your natural beauty, giving you a flawless look from morning to night.
                        </p>
                        {/* Product Card */}
                        <div className="bg-white/80 hidden rounded-2xl shadow-lg p-4 flex flex-col w-64 mt-4">
                            <span className="text-xs font-semibold text-primary mb-1">LIMITED TIME – 20% OFF</span>
                            <div className="rounded-xl overflow-hidden aspect-square bg-muted flex items-center justify-center mb-3">
                                {/* Placeholder for product image */}
                                <img src="/placeholder.svg?height=120&width=120&text=Signature%20Wig" alt="Signature Wig" className="object-contain w-24 h-24" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-sm">Signature Wig</div>
                                    <div className="text-xs text-muted-foreground">Best Seller</div>
                                </div>
                                <Button size="sm" className="rounded-full px-4 py-1 text-xs">Shop</Button>
                            </div>
                        </div>
                        {/* Navigation Dots */}
                        <div>
                            <Button variant="secondary" className=" bg-white/10 text-white font-semibold rounded-full px-4 py-1 text-xs">
                                Start Now
                            </Button>
                        </div>
                        <div className="flex items-center hidden gap-2 mt-4">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                        </div>
                    </div>
                    {/* Right: Image (already handled by background) */}
                    <div className="flex-1 hidden md:block" />
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="w-full py-12 md:py-24">
                <div className="px-4 md:px-6">
                    <motion.div
                        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter">Featured Products</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed">
                            Explore our most popular styles and latest additions
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {/* Product cards would go here */}
                        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                            <div className="aspect-square bg-muted"></div>
                            <div className="p-4">
                                <h3 className="font-semibold">Premium Human Hair Wig</h3>
                                <p className="text-muted-foreground">From £299.99</p>
                            </div>
                        </div>
                        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                            <div className="aspect-square bg-muted"></div>
                            <div className="p-4">
                                <h3 className="font-semibold">Luxury Hair Extensions</h3>
                                <p className="text-muted-foreground">From £199.99</p>
                            </div>
                        </div>
                        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                            <div className="aspect-square bg-muted"></div>
                            <div className="p-4">
                                <h3 className="font-semibold">Custom Blend Collection</h3>
                                <p className="text-muted-foreground">From £249.99</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Brand Values Section */}
            <section className="w-full py-12 md:py-24 bg-muted/30">
                <div className="px-4 md:px-6">
                    <motion.div
                        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <h2 className="text-3xl font-bold tracking-tighter">Why Choose GHBI</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed">
                            We're committed to providing the highest quality hair products and exceptional service
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
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
                            <h3 className="text-xl font-bold">Premium Quality</h3>
                            <p className="text-sm text-muted-foreground">
                                We source only the finest materials and maintain rigorous quality control to ensure our products exceed expectations.
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
                            <h3 className="text-xl font-bold">Inclusive Range</h3>
                            <p className="text-sm text-muted-foreground">
                                Our products cater to all hair types and styles, celebrating diversity and individuality.
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
                            <h3 className="text-xl font-bold">Expert Support</h3>
                            <p className="text-sm text-muted-foreground">
                                Our team of hair experts is here to help you find the perfect match for your style.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;