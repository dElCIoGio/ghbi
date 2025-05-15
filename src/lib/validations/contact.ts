import * as z from "zod"

export const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    subject: z.string().min(1, { message: "Please select a subject" }),
    message: z
        .string()
        .min(10, { message: "Message must be at least 10 characters" })
        .max(1000, { message: "Message must not exceed 1000 characters" }),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
