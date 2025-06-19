
import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { TiktokLogo, InstagramLogo } from "@phosphor-icons/react"
import { MapPin, Phone, Clock, Send, ChevronDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import Banner from "@/assets/F3F0D4AE-6646-4513-9D47-BDB84B846C86.jpeg";
import {Separator} from "@/components/ui/separator";
import axios from "axios";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true)


        try {
            // Simulate API call
            await axios.post(`https://hook.eu2.make.com/gqy5ylhfeq6yfloa6cokfe65tpbormcv`, {...data})

            toast.success("Message sent successfully!", {
                description: "We'll get back to you as soon as possible.",
            })

            form.reset()
        } catch {
            toast.error("Failed to send message", {
                description: "Please try again later or contact us directly.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    // FAQ data
    const faqItems = [
        {
            question: "What types of hair products do you offer?",
            answer:
                "We offer a wide range of premium hair products including wigs, extensions, frontals, closures, and bundles. Our products are made from high-quality human hair and come in various textures, lengths, and colors to suit your preferences.",
        },
        {
            question: "How do I determine the right size for my wig?",
            answer:
                'To find the right wig size, measure your head circumference from the front of your hairline, around your ear, to the nape of your neck, and back to the starting point. Our wigs come in small (21-21.5"), medium (22-22.5"), and large (23-23.5") sizes. Most of our wigs also feature adjustable straps for a customized fit.',
        },
        {
            question: "What is your return policy?",
            answer:
                "We offer a 30-day return policy for unused, unworn items in their original packaging. Custom orders and sale items are final sale. Please note that for hygiene reasons, we cannot accept returns on wigs that have been worn, washed, or altered in any way.",
        },
        {
            question: "How do I care for my hair extensions?",
            answer:
                "To maintain your hair extensions, wash them with sulfate-free shampoo and conditioner, air dry when possible, use heat protectant before styling, and store them properly when not in use. Deep condition every 2-3 weeks and avoid sleeping, showering, or swimming with extensions on.",
        },
        {
            question: "Do you offer international shipping?",
            answer:
                "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. Please note that customers are responsible for any customs fees or import taxes that may apply.",
        },
        {
            question: "How long does shipping take?",
            answer:
                "Domestic orders typically ship within 1-2 business days and arrive within 3-5 business days. Express shipping options are available at checkout. International orders generally take 7-14 business days to arrive, depending on the destination and customs processing.",
        },
    ]

    // Business hours
    const businessHours = [
        { day: "Monday", hours: "9:00 AM - 6:00 PM" },
        { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
        { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
        { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
        { day: "Friday", hours: "9:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" },
    ]

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex-1">
                {/* Hero Section */}
                <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={Banner}
                            alt="Elegant hair styling"
                            style={{objectFit: "cover", width: "100%", height: "100%"}}
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10"></div>
                    </div>
                    <motion.div
                        className="px-4 md:px-6 relative z-20 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            >
                                Get in Touch With Us
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            >
                                We're here to answer your questions, address your concerns, and hear your feedback about our premium
                                hair products.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            >
                                <Button variant="secondary" className="" asChild>
                                    <a href="#contact-form">
                                        Contact Us
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Contact Information */}
                <section className="w-full py-16 md:py-24 bg-white">
                    <div className="px-4 md:px-6">
                        <motion.div
                            className="text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold tracking-tight">Reach Out to Us</h2>
                            <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                We value your inquiries and feedback. Choose the most convenient way to connect with our team.
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid gap-8 md:grid-cols-2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div
                                className="flex hidden flex-col items-center text-center p-8 rounded-xl border border-muted/30 bg-white"
                                variants={fadeIn}
                                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="rounded-full bg-primary/10 p-5 mb-5">
                                    <MapPin className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Our Location</h3>
                                <p className="text-muted-foreground mb-4">
                                    123 Beauty Boulevard
                                    <br />
                                    Suite 456
                                    <br />
                                    Los Angeles, CA 90001
                                </p>
                                <Button variant="outline" className="mt-2 rounded-full" asChild>
                                    <a href="https://maps.google.com/?q=Los+Angeles+CA+90001" target="_blank" rel="noopener noreferrer">
                                        Get Directions
                                        <ExternalLink className="ml-1 h-3 w-3" />
                                    </a>
                                </Button>
                            </motion.div>

                            <motion.div
                                className="flex flex-col items-center text-center p-8 rounded-xl border border-muted/30 bg-white"
                                variants={fadeIn}
                                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="rounded-full bg-primary/10 p-5 mb-5">
                                    <Phone className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Phone & Email</h3>
                                <p className="text-muted-foreground mb-2">
                                    <a href="tel:+18005551234" className="hover:text-primary transition-colors">
                                        (800) 555-1234
                                    </a>
                                </p>
                                <p className="text-muted-foreground mb-4">
                                    <a href="mailto:contact@ghbi.com" className="hover:text-primary transition-colors">
                                        contact@ghbi.com
                                    </a>
                                </p>
                                <p className="text-xs text-muted-foreground mt-2">Customer service available during business hours</p>
                            </motion.div>

                            <motion.div
                                className="flex flex-col items-center text-center p-8 rounded-xl border border-muted/30 bg-white"
                                variants={fadeIn}
                                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="rounded-full bg-primary/10 p-5 mb-5">
                                    <Clock className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                                <div className="w-full space-y-2">
                                    {businessHours.map((item) => (
                                        <div key={item.day} className="flex justify-between text-sm">
                                            <span className="font-medium">{item.day}</span>
                                            <span className={`${item.hours === "Closed" ? "text-red-500" : "text-muted-foreground"}`}>
                        {item.hours}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
                <Separator className=""/>
                {/* Map and Contact Form */}
                <section id="contact-form" className="w-full py-16 md:py-24 bg-muted/10">

                    <div className="px-4 md:px-6">
                        <div className="">
                            {/* Contact Form */}
                            <motion.div
                                className="order-2 lg:order-1"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                            >
                                <div className="bg-white p-8 ">
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold tracking-tight">Send Us a Message</h2>
                                        <div className="w-16 h-1 bg-primary mt-4 mb-4"></div>
                                        <p className="text-muted-foreground">
                                            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
                                        </p>
                                    </div>

                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Full Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Your name" className="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email Address</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Your email address"
                                                                    type="email"
                                                                    className=""
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Subject</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="rounded-md">
                                                                    <SelectValue placeholder="Select a subject" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="general">General Inquiry</SelectItem>
                                                                <SelectItem value="product">Product Question</SelectItem>
                                                                <SelectItem value="order">Order Status</SelectItem>
                                                                <SelectItem value="returns">Returns & Exchanges</SelectItem>
                                                                <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Message</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Your message" className="min-h-[150px] rounded-md" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    "Sending..."
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" /> Send Message
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </motion.div>

                            {/* Map */}
                            <motion.div
                                className="order-1 hidden lg:order-2"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                            >
                                <div className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm border border-muted/30">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152269.5630138104!2d-3.0837407094184384!3d53.393148862042366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487adf8a647060b7%3A0x42dc046f3f176e01!2sLiverpool!5e0!3m2!1sen!2suk!4v1747325802799!5m2!1sen!2suk"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="GHBI Location"
                                        className="w-full h-full min-h-[400px]"
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="w-full py-16 md:py-24 bg-white">
                    <div className="px-4 md:px-6">
                        <motion.div
                            className="text-center mb-16"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                            <div className="w-24 h-1 bg-primary mx-auto mt-4 mb-6"></div>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Find answers to common questions about our products, services, and policies.
                            </p>
                        </motion.div>

                        <motion.div
                            className="max-w-3xl mx-auto"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <Accordion type="single" collapsible className="w-full">
                                {faqItems.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-muted/50">
                                        <AccordionTrigger className="text-left py-5 font-medium">{item.question}</AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground pb-5">{item.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>

                            <div className="text-center mt-12">
                                <p className="text-muted-foreground mb-6">
                                    Can't find what you're looking for? Our customer support team is here to help.
                                </p>
                                <Button asChild size="lg" className="rounded-full px-8">
                                    <a href="#contact-form">Ask Your Question</a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Social Media Section */}
                <section className="w-full py-16 md:py-24 bg-muted/10 relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-5">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                    </div>
                    <div className="px-4 md:px-6 relative z-10">
                        <motion.div
                            className="flex flex-col items-center justify-center space-y-6 text-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeIn}
                        >
                            <div className="space-y-3 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-bold tracking-tight">Connect With Us</h2>
                                <div className="w-16 h-1 bg-primary mx-auto"></div>
                                <p className="text-muted-foreground">
                                    Follow us on social media for the latest updates, styling tips, and exclusive promotions.
                                </p>
                            </div>
                            <div className="flex space-x-6 mt-8">
                                <motion.a
                                    href="https://instagram.com/glossyhairbyisis"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white p-4 shadow-sm hover:shadow-md transition-all border border-muted/20"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <InstagramLogo className="h-7 w-7 text-primary" />
                                    <span className="sr-only">Instagram</span>
                                </motion.a>
                                <motion.a
                                    href="https://tiktok.com/@glossyhairbyisis"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full bg-white p-4 shadow-sm hover:shadow-md transition-all border border-muted/20"
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <TiktokLogo className="h-7 w-7 text-primary" />
                                    <span className="sr-only">Facebook</span>
                                </motion.a>
                            </div>
                            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-muted/30 max-w-md">
                                <p className="text-center">
                                    Tag us in your photos with <span className="font-medium text-pink-600">#GlossyHairByIsis</span> for a
                                    chance to be featured on our social media and website!
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    )
}
