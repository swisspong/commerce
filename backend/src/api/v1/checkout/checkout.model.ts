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


export const CheckoutIdScema = z.object({
    chkt_id: z.string().trim()
})

export type TCheckoutId = z.infer<typeof CheckoutIdScema>

