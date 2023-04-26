import * as z from "zod"

export const CustomerSignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})
export const CustomerSigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type TCustomerSignup = z.infer<typeof CustomerSignupSchema>
export type TCustomerSignin = z.infer<typeof CustomerSigninSchema>
