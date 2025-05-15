export interface UserCredentials {
    email: string
    password: string
}

export interface SignUpData extends UserCredentials {
    firstName: string
    lastName: string
    confirmPassword: string
    acceptTerms: boolean
    marketingConsent?: boolean
}

export interface ForgotPasswordData {
    email: string
}

export interface ResetPasswordData {
    password: string
    confirmPassword: string
}

export interface VerificationData {
    code: string
}

export interface AuthError {
    field?: string
    message: string
}

export type PasswordStrength = "weak" | "medium" | "strong"

export interface SocialProvider {
    id: string
    name: string
    icon: string
}
