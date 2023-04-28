import * as z from "zod";

export const CreateRoleSchema = z.object({
  name: z.string().trim().min(1),
  permissions: z.number().array(),
});
export const UpdateRoleSchema = CreateRoleSchema.extend({});
export const RoleIdSchema = z.object({
  role_id: z.string().trim().min(1),
});

export type TCrateRole = z.infer<typeof CreateRoleSchema>;
export type TUpdateRole = z.infer<typeof UpdateRoleSchema>;
export type TRoleId = z.infer<typeof RoleIdSchema>;
