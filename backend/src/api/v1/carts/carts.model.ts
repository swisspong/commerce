import * as z from "zod"
// export interface UpdateItemInCartInput {
//     item_id: string;
//     quantity: number;
//     variant_id?: string;
// }
import { Variant, VariantSelected } from "@prisma/client";

//fdsfs


export const AddItemToCartSchema = z.object({
    id: z.string(),
    quantity: z.number(),
    variant_id: z.string().nullable().optional().default(null)
})
export const UpdateItemInCartSchema = AddItemToCartSchema.omit({ id: true })
export const CartIdSchema = z.object({ cart_id: z.string().trim().min(19).refine(value => /^cart_\w{15}$/.test(value)) })
export const ItemIdSchema = CartIdSchema.extend({
    item_id: z.string().trim().min(19).refine(value => /^item_\w{15}$/.test(value))
})

export type TAddItemToCart = z.infer<typeof AddItemToCartSchema>
export type TUpdateItemInCart = z.infer<typeof UpdateItemInCartSchema>
export type TCartId = z.infer<typeof CartIdSchema>
export type TItemId = z.infer<typeof ItemIdSchema>

export interface CreateCartItem {
    id: string;
    prod_id: string;
    quantitiy: number;
    vrnt_id: string | null;
}

export interface UpdateItemQty {
    where: {
        id: string;
    };
    data: {
        quantitiy: {
            increment: number;
        };

    };
}
export interface UpdateCartItem {
    where: {
        id: string;
    };
    data: {
        quantitiy: number;
        vrnt_id?: string | null
    };
}
export type ExistingVariant = (Variant & {
    VariantSelected: (VariantSelected & {
        variantGroup: {
            prod_id: string;
        };
    })[];
}) | null
