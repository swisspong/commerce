
import * as z from 'zod';

export const CreateProductSchema = z.object({
    categories: z.object({ id: z.string().trim().min(19).refine(value => /^cat_\w{15}$/.test(value)) }).array(),
    name: z.string().trim().min(1),
    price: z.number().gte(0),
    description: z.string().trim().min(1),
    available_stock: z.number().int()
})
export const ProductIdSchema = z.object({ prod_id: z.string().trim().min(19).refine(value => /^prod_\w{15}$/.test(value)) })
export const UpdateProductSchema = CreateProductSchema.extend({})


export type TCreateProduct = z.infer<typeof CreateProductSchema>;
export type TProductId = z.infer<typeof ProductIdSchema>;
export type TUpdateProduct = z.infer<typeof UpdateProductSchema>;
