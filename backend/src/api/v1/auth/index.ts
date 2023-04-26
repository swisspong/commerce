import express from "express";
import { AuthMerchantsRoute } from "./merchants/merchants.route";
import { AuthCustomersRoute } from "./customers/customer.route";

const router = express.Router();

router.use('/merchants',AuthMerchantsRoute );
router.use('/cusotmers',AuthCustomersRoute );


export { router as ProductRoute }