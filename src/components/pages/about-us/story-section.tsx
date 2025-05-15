import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

export interface StorySectionProps {
    /** URL or import of the background image */
    backgroundSrc: string;
    /** Main heading text */
    title?: string;
    /** Subheading/paragraph text */
    subtitle?: string;
    /** Button label */
    buttonText?: string;
    /** Anchor or URL the button links to */
    buttonHref?: string;
    /** Tailwind class for the gradient start color */
    gradientFrom?: string;
    /** Tailwind class for the gradient end color */
    gradientTo?: string;
    /** Parallax distance, e.g. ['0%', '20%'] */
    parallaxDistance?: [string, string];
}

const defaultFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const StorySection: React.FC<StorySectionProps> = ({
                                                       backgroundSrc,
                                                       title = 'Our Story',
                                                       subtitle = 'Empowering women through quality hair products since 2018',
                                                       buttonText = 'Discover Our Mission',
                                                       buttonHref = '#our-mission',
                                                       gradientFrom = 'from-background/80',
                                                       gradientTo = 'to-background/60',
                                                       parallaxDistance = ['0%', '20%'],
                                                   }) => {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Remove any casting by leveraging proper typing of parallaxDistance
    const y = useTransform(scrollYProgress, [0, 1], parallaxDistance);

    return (
        <section
            ref={ref}
            className="w-full bg-muted/30 relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                <motion.img
                    src={backgroundSrc}
                    alt={`${title} background`}
                    className="object-cover w-full h-full"
                    style={{ y }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />
            </div>

            <motion.div
                className="px-4 md:px-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={defaultFadeIn}
            >
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                            {title}
                        </h1>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
                            {subtitle}
                        </p>
                    </div>

                    <motion.div whileTap={{ scale: 0.95 }}>
                        <Button className="mt-4" size="lg" asChild>
                            <a href={buttonHref}>
                                {buttonText}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default StorySection;
