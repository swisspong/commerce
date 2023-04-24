
import * as z from 'zod';

export const CreateCategoriesSchema = z.object({
    name: z.string().trim().min(1)
}).array().min(1)

export const UpdateCategoriesSchema =
    z.object({
        id: z.string().trim().refine((value) => /^cat_\w{15}$/.test(value)),
        name: z.string().trim().min(1),
        // index: z.number().int(),
        isDelete: z.boolean().optional()
    }).array().min(1)


export type TCreateCategories = z.infer<typeof CreateCategoriesSchema>;
export type TUpdateCategories = z.infer<typeof UpdateCategoriesSchema>;

