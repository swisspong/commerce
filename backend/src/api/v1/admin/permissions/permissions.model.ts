import * as z from "zod";

export const CreatePermissionSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
});
export const UpdatePermissionSchema = CreatePermissionSchema.extend({});
export const PermissionIdSchema = z.object({
    permission_id: z.string().trim().min(1)
})

export type TCreatePermission = z.infer<typeof CreatePermissionSchema>;
export type TUpdatePermission = z.infer<typeof UpdatePermissionSchema>;
export type TPermissionId = z.infer<typeof PermissionIdSchema>;

