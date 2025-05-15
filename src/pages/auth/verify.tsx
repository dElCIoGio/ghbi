
import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {Link, useNavigate, useSearchParams} from "react-router";
import type {AuthError, VerificationData} from "@/types/auth.ts";

export default function VerifyPage() {
    const navigate = useNavigate()
    const [searchParams, ] = useSearchParams()
    const email = searchParams.get("email") || ""

    const [formData, setFormData] = useState<VerificationData>({
        code: "",
    })
    const [errors, setErrors] = useState<AuthError[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30)
    const [canResend, setCanResend] = useState(false)
    const [isResending, setIsResending] = useState(false)

    useEffect(() => {
        if (timeLeft > 0 && !canResend) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (timeLeft === 0 && !canResend) {
            setCanResend(true)
        }
    }, [timeLeft, canResend])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Only allow numbers and limit to 6 characters
        if (name === "code" && !/^\d*$/.test(value)) {
            return
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear specific field error when user starts typing
        if (errors.some((error) => error.field === name)) {
            setErrors(errors.filter((error) => error.field !== name))
        }

        // Auto-submit when code is 6 digits
        if (name === "code" && value.length === 6) {
            validateAndSubmit(value)
        }
    }

    const validateAndSubmit = (code: string) => {
        const newErrors: AuthError[] = []

        if (!code) {
            newErrors.push({ field: "code", message: "Verification code is required" })
        } else if (code.length !== 6) {
            newErrors.push({ field: "code", message: "Verification code must be 6 digits" })
        }

        if (newErrors.length === 0) {
            handleSubmit(code)
        } else {
            setErrors(newErrors)
        }
    }

    const handleSubmit = async (code: string = formData.code) => {
        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // For demo purposes, any code is valid except "000000"
            if (code === "000000") {
                setErrors([{ field: "code", message: "Invalid verification code" }])
            } else {
                setIsVerified(true)

                // Redirect after a delay
                setTimeout(() => {
                    navigate("/auth/login")
                }, 3000)
            }
        } catch {
            setErrors([{ message: "An error occurred. Please try again." }])
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleResendCode = async () => {
        setIsResending(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Reset timer
            setTimeLeft(30)
            setCanResend(false)

            // Clear any errors
            setErrors([])
        } catch {
            setErrors([{ message: "Failed to resend code. Please try again." }])
        } finally {
            setIsResending(false)
        }
    }

    const getFieldError = (fieldName: string): string | undefined => {
        const error = errors.find((err) => err.field === fieldName)
        return error?.message
    }

    const hasGeneralError = errors.some((err) => !err.field)

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
                            <h1 className="mt-6 text-3xl font-semibold tracking-tight">Verify Your Account</h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {email ? `We've sent a verification code to ${email}` : "Enter the verification code we sent you"}
                            </p>
                        </div>

                        {hasGeneralError && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errors.find((err) => !err.field)?.message}</AlertDescription>
                            </Alert>
                        )}

                        {isVerified ? (
                            <motion.div
                                className="space-y-6 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <Alert className="bg-green-50 border-green-200 text-green-800">
                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                    <AlertDescription>
                                        Your account has been successfully verified! Redirecting you to login...
                                    </AlertDescription>
                                </Alert>
                            </motion.div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    validateAndSubmit(formData.code)
                                }}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <div className="text-center">
                                        <Input
                                            id="code"
                                            name="code"
                                            type="text"
                                            maxLength={6}
                                            placeholder="Enter 6-digit code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            className={`text-center text-lg tracking-widest ${getFieldError("code") ? "border-red-500" : ""}`}
                                        />
                                        {getFieldError("code") && (
                                            <p className="text-sm text-red-500 flex items-center justify-center mt-1">
                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                {getFieldError("code")}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Verifying..." : "Verify Account"}
                                </Button>

                                <div className="text-center text-sm">
                                    <p className="text-muted-foreground">
                                        Didn't receive a code?{" "}
                                        {canResend ? (
                                            <button
                                                type="button"
                                                onClick={handleResendCode}
                                                disabled={isResending}
                                                className="text-primary hover:underline"
                                            >
                                                {isResending ? "Resending..." : "Resend Code"}
                                            </button>
                                        ) : (
                                            <span>Resend code in {timeLeft}s</span>
                                        )}
                                    </p>
                                </div>

                                <div className="text-center">
                                    <Link to="/auth/login" className="text-sm text-primary hover:underline inline-flex items-center">
                                        <ArrowLeft className="h-3 w-3 mr-1" />
                                        Back to Sign In
                                    </Link>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>

                {/* Right side - Image */}
                <div className="hidden lg:block lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10 z-10"></div>
                    <img
                        src="/placeholder.svg?height=1080&width=1080&text=GHBI"
                        alt="Glossy Hair By Isis"
                        className="object-cover w-full h-full"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="max-w-md text-white text-center">
                            <h2 className="text-4xl font-bold mb-4">Almost There!</h2>
                            <p className="text-lg">Verify your account to access all the premium features of GHBI.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
