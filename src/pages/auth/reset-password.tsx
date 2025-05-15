import {Link, useNavigate, useSearchParams} from "react-router";
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/validations/auth"
import type { PasswordStrength } from "@/types/auth"
import PasswordStrengthMeter from "@/components/pages/sign-up/password-strength-meter.tsx";

export default function ResetPasswordPage() {
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams()
    const token = searchParams.get("token")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>("weak")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Check if token is valid
    const isValidToken = token && token.length > 10 // Simple validation for demo purposes

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
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

    const onSubmit = async (data: ResetPasswordFormValues) => {
        setIsSubmitting(true)
        
        console.log(data);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast.success("Password reset successfully!", {
                description: "You can now sign in with your new password.",
            })

            // Redirect to login page on success
            navigate("/auth/login?reset=true")
        } catch {
            toast.error("Failed to reset password", {
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

    // If token is invalid, show error
    if (!isValidToken) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block">
                            <span className="text-2xl font-bold tracking-tight">GHBI</span>
                        </Link>
                    </div>
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            Invalid or expired password reset link. Please request a new password reset link.
                        </AlertDescription>
                    </Alert>
                    <Button asChild className="w-full">
                        <Link to="/auth/forgot-password">Request New Link</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col lg:flex-row">
                {/* Left side - Image */}
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
                            <h2 className="text-4xl font-bold mb-4">Create New Password</h2>
                            <p className="text-lg">Choose a strong password to keep your account secure.</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
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
                            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Reset Password</h1>
                            <p className="mt-2 text-sm text-muted-foreground">Create a new password for your account</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Create a new password"
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
                                            <FormLabel>Confirm New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Confirm your new password"
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

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Resetting Password..." : "Reset Password"}
                                </Button>

                                <p className="text-center text-sm">
                                    Remember your password?{" "}
                                    <Link to="/auth/login" className="text-primary hover:underline">
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </Form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
