import express from "express";
// import { CustomerSignin, CustomerSignout, CustomerSignup } from "./customers.controller";
import { validateRequest } from "../../../../middlewares/validateRequest";
import { MerchantSigninSchema, MerchantSignupSchema } from "./merchants.model";
import { MerchantSignin, MerchantSignout, MerchantSignup } from "./merchants.controller";
// import { CustomerSigninSchema, CustomerSignupSchema } from "./customers.model";

const router = express.Router();

router.post('/signup', validateRequest({ body: MerchantSignupSchema }), MerchantSignup);
router.post('/signin', validateRequest({ body: MerchantSigninSchema }), MerchantSignin);
router.post('/signout', MerchantSignout);

export { router as AuthMerchantsRoute }