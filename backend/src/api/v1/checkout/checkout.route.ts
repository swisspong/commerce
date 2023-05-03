

import express from "express"
import { Checkout, CheckoutToCreateOrder } from "./checkout.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { CheckoutIdScema } from "./checkout.model";

const router = express.Router();
router.post('/', Checkout)
router.post('/:chkt_id',validateRequest({params:CheckoutIdScema}),CheckoutToCreateOrder)

export { router as CheckoutRoute }