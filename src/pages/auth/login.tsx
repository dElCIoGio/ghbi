import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth"
import { Link, useNavigate, useSearchParams } from "react-router"
import SocialLoginButtons from "@/components/pages/sign-up/social-login-buttons"
import {useIsMobile} from "@/hooks/use-mobile.ts";

export default function LoginPage() {

    const isMobile = useIsMobile()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const registered = searchParams.get("registered")
    const resetSuccess = searchParams.get("reset")

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    useEffect(() => {
        if (registered === "true") {
            toast.success("Account created successfully!", {
                description: "Please sign in with your credentials.",
                icon: <CheckCircle2 className="h-4 w-4" />,
            })
        } else if (resetSuccess === "true") {
            toast.success("Password reset successfully!", {
                description: "Please sign in with your new password.",
                icon: <CheckCircle2 className="h-4 w-4" />,
            })
        }
    }, [registered, resetSuccess])

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true)
        
        console.log(data)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast.success("Signed in successfully!", {
                description: "Welcome back to GHBI.",
            })

            // Redirect to dashboard on success
            navigate("/")
        } catch {
            toast.error("Authentication failed", {
                description: "Invalid email or password. Please try again.",
            })
            form.setError("root", {
                message: "Invalid email or password",
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
        <div className="flex flex-col">
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
                            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                            <p className="text-lg">Sign in to access your account and continue your beauty journey with GHBI.</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <motion.div
                    className="flex-1 flex flex-col justify-center items-center p-6 sm:p-4"
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                >
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <Link to="/" className={`${isMobile? "hidden":"inline-block"}`}>
                                <span className="text-2xl font-bold tracking-tight">GHBI</span>
                            </Link>
                            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in</h1>
                            <p className="mt-2 text-sm text-muted-foreground">Welcome back to Glossy Hair By Isis</p>
                        </div>

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

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>
                                                <Link to="/auth/forgot-password" className="text-xs text-primary hover:underline">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Enter your password"
                                                        type={showPassword ? "text" : "password"}
                                                        autoComplete="current-password"
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rememberMe"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm">Remember me</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {form.formState.errors.root && (
                                    <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
                                )}

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Signing In..." : "Sign In"}
                                </Button>

                                <div className="relative my-6">
                                    <Separator />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                                </div>

                                <SocialLoginButtons />

                                <p className="text-center text-sm">
                                    Don't have an account?{" "}
                                    <Link to="/auth/sign-up" className="text-primary hover:underline">
                                        Create an account
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
