import * as z from "zod"

export const MerchantSignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})
export const MerchantSigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type TMerchantSignup = z.infer<typeof MerchantSignupSchema>
export type TMerchantSignin = z.infer<typeof MerchantSigninSchema>
