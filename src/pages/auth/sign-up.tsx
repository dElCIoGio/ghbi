import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { signUpSchema } from "@/lib/validations/auth"
import type { PasswordStrength } from "@/types/auth"
import { Link, useNavigate } from "react-router"
import PasswordStrengthMeter from "@/components/pages/sign-up/password-strength-meter"
import SocialLoginButtons from "@/components/pages/sign-up/social-login-buttons"
import { z } from "zod"
import {useIsMobile} from "@/hooks/use-mobile";

export default function SignUpPage() {

    const isMobile = useIsMobile()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>("weak")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
            marketingConsent: false,
        },
    })

    // Watch password to calculate strength
    const password = form.watch("password")

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password))
    }, [password])

    const calculatePasswordStrength = (password: string): PasswordStrength => {
        if (!password) return "weak"

        // Basic password strength calculation
        const hasLowerCase = /[a-z]/.test(password)
        const hasUpperCase = /[A-Z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const isLongEnough = password.length >= 8

        const score =
            (hasLowerCase ? 1 : 0) +
            (hasUpperCase ? 1 : 0) +
            (hasNumber ? 1 : 0) +
            (hasSpecialChar ? 1 : 0) +
            (isLongEnough ? 1 : 0)

        if (score >= 4) return "strong"
        if (score >= 2) return "medium"
        return "weak"
    }

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
        setIsSubmitting(true)

        console.log(data)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Show success toast
            toast.success("Account created successfully!", {
                description: "You can now sign in with your credentials.",
            })

            // Redirect to login page on success
            navigate("/auth/login?registered=true")
        } catch {
            toast.error("Failed to create account", {
                description: "An error occurred during sign up. Please try again.",
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
        <div className="flex flex-1 flex-col">
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
                            <Link to="/" className={`${isMobile? "hidden":"inline-block"}`}>
                                <span className="text-2xl font-bold tracking-tight">GHBI</span>
                            </Link>
                            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Create an account</h1>
                            <p className="mt-2 text-sm text-muted-foreground">Join GHBI to access exclusive products and offers</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your first name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your last name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

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

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Create a password"
                                                        type={showPassword ? "text" : "password"}
                                                        autoComplete="new-password"
                                                        className="pr-10"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            {field.value && <PasswordStrengthMeter strength={passwordStrength} />}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Confirm your password"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        autoComplete="new-password"
                                                        className="pr-10"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="acceptTerms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm">
                                                        I agree to the{" "}
                                                        <Link to="/terms" className="text-primary hover:underline">
                                                            Terms of Service
                                                        </Link>{" "}
                                                        and{" "}
                                                        <Link to="/privacy" className="text-primary hover:underline">
                                                            Privacy Policy
                                                        </Link>
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="marketingConsent"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm">
                                                        I want to receive exclusive offers and promotions via email
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Creating Account..." : "Create Account"}
                                </Button>
                            </form>
                        </Form>

                        <div className="relative my-6">
                            <Separator />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                OR CONTINUE WITH
              </span>
                        </div>

                        <SocialLoginButtons />

                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/auth/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
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
                    <div className="absolute inset-0 flex flex-col justify-center p-12 z-20">
                        <div className="max-w-md text-white">
                            <h2 className="text-3xl font-bold mb-4">Elevate Your Style</h2>
                            <p className="text-lg mb-6">
                                Join the GHBI community and discover premium hair products designed to enhance your natural beauty.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 mr-2 text-primary" />
                                    <span>Exclusive member discounts</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 mr-2 text-primary" />
                                    <span>Early access to new collections</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 mr-2 text-primary" />
                                    <span>Personalized style recommendations</span>
                                </li>
                                <li className="flex items-center hidden">
                                    <Check className="h-5 w-5 mr-2 text-primary" />
                                    <span>Free shipping on your first order</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
