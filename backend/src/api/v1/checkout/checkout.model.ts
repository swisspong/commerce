import * as z from "zod"


export interface ICrItemReserved {
    id: string;
    name: string;
    product_id: string;
    description: string;
    quantity: number;
    total: number;
    vrnt_id: string | null

}


const base = z.object({
    chkt_id: z.string().trim(),

})

export const CheckoutIdScema = z.object({
    chkt_id: z.string().trim(),

})


export const CreateOrderSchema = z.object({
    asset_id: z.string().trim().optional(),
    omise_source: z.string().trim().optional(),
    omise_token: z.string().trim().optional()
}).refine((data) => {
    const { asset_id, omise_source, omise_token } = data;
    if (!asset_id && (!omise_source || !omise_token)) {
        //   throw new z.ZodError({
        //     asset_id: 'Asset ID or both Omise source and token are required',
        //     omise_source: 'Omise source and token are both required if asset ID is not provided',
        //     omise_token: 'Omise source and token are both required if asset ID is not provided',
        //   });
        return false
    }
    return true;
});


export type TCheckoutId = z.infer<typeof CheckoutIdScema>
export type TCreateOrder = z.infer<typeof CreateOrderSchema>
