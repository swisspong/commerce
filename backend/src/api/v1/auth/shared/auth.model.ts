import * as z from "zod"
export const SignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})
export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type TSignup = z.infer<typeof SignupSchema>
export type TSignin = z.infer<typeof SigninSchema>