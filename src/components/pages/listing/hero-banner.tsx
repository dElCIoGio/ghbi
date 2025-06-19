import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

export function HeroBanner() {
    return (
        <section className="w-full py-8 md:py-12 bg-muted/30 relative overflow-hidden">

            <motion.div
                className="px-4 md:px-6 relative z-10"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Collection</h1>
                        <p className="max-w-[700px] text-muted-foreground md:text-lg/relaxed">
                            Discover premium wigs and hair extensions designed to enhance your natural beauty
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
} 