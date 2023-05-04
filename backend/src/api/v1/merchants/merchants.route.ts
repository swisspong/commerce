import { Router } from "express";
import { GetMerchantInfo } from "./merchants.controller";
import { requireAuth } from "../../../middlewares/require-auth";



const router =Router();

router.get("/",requireAuth,GetMerchantInfo)
export {router as MerchantsRoute}