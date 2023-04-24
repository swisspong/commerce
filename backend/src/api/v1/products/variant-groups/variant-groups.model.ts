
import * as z from 'zod';

export const UpsertVariantGroupsSchema = z.object({
    variant_groups: z.object({
        id: z.string().optional(),
        name: z.string(),
        options: z.object({
            id: z.string().optional(),
            name: z.string()
        }).array().min(1)
    }).array().min(1)
})

export type TUpsertVariantGroups = z.infer<typeof UpsertVariantGroupsSchema>

// prod_id: string;
// variant_groups: { id?: string, name: string, options: { id?: string, name: string }[] }[]
// export const ProductIdSchema = z.object({ prod_id: z.string().trim().min(19).refine(value => /^prod_\w{15}$/.test(value)) })
// export const UpdateProductSchema = CreateProductSchema.extend({})


// export type TCreateProduct = z.infer<typeof CreateProductSchema>;
// export type TProductId = z.infer<typeof ProductIdSchema>;
// export type TUpdateProduct = z.infer<typeof UpdateProductSchema>;
