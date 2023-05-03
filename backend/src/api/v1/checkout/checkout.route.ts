

import express from "express"
import { Checkout, CheckoutToCreateOrder } from "./checkout.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { CheckoutIdScema, CreateOrderSchema } from "./checkout.model";

const router = express.Router();
router.post('/', Checkout)
router.post('/:chkt_id',validateRequest({params:CheckoutIdScema,body:CreateOrderSchema}),CheckoutToCreateOrder)

export { router as CheckoutRoute }