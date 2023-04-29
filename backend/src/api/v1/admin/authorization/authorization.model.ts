import * as z from "zod";

export const CreateAdminRoleScdhema = z.object({
    rolesId: z.number().array()
})

export const DeleteManyAdminRoleSchema = CreateAdminRoleScdhema.extend({})

export type TCreateAdminRole = z.infer<typeof CreateAdminRoleScdhema>
export type TDeleteAdminRole = z.infer<typeof DeleteManyAdminRoleSchema>