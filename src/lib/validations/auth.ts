import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    rememberMe: z.boolean(),
})

export const signUpSchema = z
    .object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        email: z.string().email({ message: "Please enter a valid email address" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
        marketingConsent: z.boolean().default(false),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
})

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const verificationSchema = z.object({
    code: z
        .string()
        .min(6, { message: "Verification code must be 6 digits" })
        .max(6, { message: "Verification code must be 6 digits" })
        .regex(/^\d+$/, { message: "Verification code must contain only numbers" }),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
export type VerificationFormValues = z.infer<typeof verificationSchema>
