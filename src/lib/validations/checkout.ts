import * as z from "zod"

// Address schema
export const addressSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Address name is required" }),
    addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
    addressLine2: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    isDefault: z.boolean().default(false),
})

// Payment schema
export const paymentSchema = z.object({
    paymentMethodId: z.string().min(1, { message: "Payment method is required" }),
    cardNumber: z
        .string()
        .optional()
        .refine((val) => !val || (val.replace(/\s/g, "").length >= 13 && val.replace(/\s/g, "").length <= 19), {
            message: "Card number must be between 13 and 19 digits",
        }),
    cardName: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 3, { message: "Cardholder name is required" }),
    cardExpiry: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{2}\/\d{2}$/.test(val), { message: "Expiry date must be in MM/YY format" }),
    cardCvc: z
        .string()
        .optional()
        .refine((val) => !val || (val.length >= 3 && val.length <= 4), { message: "CVC must be 3 or 4 digits" }),
    savePaymentMethod: z.boolean().default(false),
})

// Checkout schema
export const checkoutSchema = z.object({
    // Contact information
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    saveInfo: z.boolean().default(false),
    createAccount: z.boolean().default(false),
    password: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 8, { message: "Password must be at least 8 characters" }),

    // Shipping information
    shippingAddressId: z.string().optional(),
    billingAddressId: z.string().optional(),
    shippingMethodId: z.string().min(1, { message: "Shipping method is required" }),

    // Payment information
    paymentMethodId: z.string().min(1, { message: "Payment method is required" }),
    cardNumber: z
        .string()
        .optional()
        .refine((val) => !val || (val.replace(/\s/g, "").length >= 13 && val.replace(/\s/g, "").length <= 19), {
            message: "Card number must be between 13 and 19 digits",
        }),
    cardName: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 3, { message: "Cardholder name is required" }),
    cardExpiry: z
        .string()
        .optional()
        .refine((val) => !val || /^\d{2}\/\d{2}$/.test(val), { message: "Expiry date must be in MM/YY format" }),
    cardCvc: z
        .string()
        .optional()
        .refine((val) => !val || (val.length >= 3 && val.length <= 4), { message: "CVC must be 3 or 4 digits" }),
    savePaymentMethod: z.boolean().default(false),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
