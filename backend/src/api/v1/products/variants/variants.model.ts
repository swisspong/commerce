

import * as z from "zod"



export const CreateVariantSchema = z.object({
    price: z.number().default(0),
    quantity: z.number().int().nullable(),
    sku: z.string(),
    description: z.string(),
    options: z.array(z.record(z.string()))
})
export const DeleteManyVariantSchema = z.object({
    variants: z.string().array()
})

export const UpdateManyVariantSchema = z.object({
    variants: CreateVariantSchema.merge(z.object({ id: z.string() })).array()
})

export type TCreateVariant = z.infer<typeof CreateVariantSchema>
export type TDeleteManyVariant = z.infer<typeof DeleteManyVariantSchema>
export type TUpdateManyVariant = z.infer<typeof UpdateManyVariantSchema>
