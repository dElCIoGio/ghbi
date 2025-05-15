
import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth"
import {Link} from "react-router";

export default function ForgotPasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedEmail, setSubmittedEmail] = useState("")

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            setSubmittedEmail(data.email)
            setIsSubmitted(true)

            toast.success("Reset link sent", {
                description: "Check your email for instructions to reset your password.",
            })
        } catch {
            toast.error("Failed to send reset link", {
                description: "An error occurred. Please try again.",
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

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left side - Form */}
                <motion.div
                    className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <Link to="/" className="inline-block">
                                <span className="text-2xl font-bold tracking-tight">GHBI</span>
                            </Link>
                            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Forgot Password</h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Enter your email and we'll send you a link to reset your password
                            </p>
                        </div>

                        {isSubmitted ? (
                            <motion.div
                                className="space-y-6 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    <Mail className="h-8 w-8 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-medium">Check your email</h2>
                                    <p className="text-muted-foreground">
                                        We've sent a password reset link to <span className="font-medium">{submittedEmail}</span>
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        If you don't see it, check your spam folder or try another email address.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Button asChild variant="outline" className="w-full">
                                        <Link to="/auth/login">
                                            <ArrowLeft className="h-4 w-4 mr-2" />
                                            Back to Sign In
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email" type="email" autoComplete="email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send Reset Link"}
                                    </Button>

                                    <div className="text-center">
                                        <Link to="/auth/login" className="text-sm text-primary hover:underline inline-flex items-center">
                                            <ArrowLeft className="h-3 w-3 mr-1" />
                                            Back to Sign In
                                        </Link>
                                    </div>
                                </form>
                            </Form>
                        )}
                    </div>
                </motion.div>

                {/* Right side - Image */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-10"></div>
                    <img
                        src="/placeholder.svg?height=1080&width=1080&text=GHBI"
                        alt="Glossy Hair By Isis"
                        style={{objectFit: "cover", width: "100%", height: "100%"}}
                        loading="eager"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="max-w-md text-white text-center">
                            <h2 className="text-4xl font-bold mb-4">Reset Your Password</h2>
                            <p className="text-lg">
                                Don't worry, it happens to the best of us. We'll help you get back into your account.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
