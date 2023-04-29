
import * as z from "zod";

export const CreateAdminSchema  = z.object({
    username: z.string().trim().min(1),
    email: z.string().email(),
    password: z.string()
})

export const AdminIdSchema = z.object({
    admin_id: z.string().trim().min(1)
})

export const UpdateAdminSchema = CreateAdminSchema.extend({})


export type TCreateAdmin = z.infer<typeof CreateAdminSchema>
export type TAdminId = z.infer<typeof AdminIdSchema>
export type TUpdateAdmin = z.infer<typeof UpdateAdminSchema>