

import express from "express"
import { Checkout } from "./checkout.controller";

const router = express.Router();
router.post('/', Checkout)

export { router as CheckoutRoute }