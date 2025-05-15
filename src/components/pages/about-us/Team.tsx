import { motion } from "framer-motion"

const teamMembers = [
    {
        name: "Isis Thompson",
        role: "Founder & CEO",
        bio: "Passionate about helping women feel confident through quality hair products.",
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        name: "Maya Chen",
        role: "Creative Director",
        bio: "Brings artistic vision to GHBI's brand identity and product design.",
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        name: "Zoe Martinez",
        role: "Head of Product Development",
        bio: "Ensures every GHBI product meets our high standards of quality and innovation.",
        image: "/placeholder.svg?height=300&width=300",
    },
]

export function Team() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
            <div className="px-4 md:px-6">
                <motion.div
                    className="mb-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                >
                    <h2 className="text-3xl font-bold tracking-tighter mb-4">Meet Our Team</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground">
                        The passionate individuals behind GHBI who are dedicated to helping you look and feel your best.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center text-center"
                            variants={fadeIn}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative mb-4 w-48 h-48 overflow-hidden rounded-full">
                                <img src={member.image} alt={member.name} className="object-cover" />
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-primary font-medium mb-2">{member.role}</p>
                            <p className="text-muted-foreground">{member.bio}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
} 