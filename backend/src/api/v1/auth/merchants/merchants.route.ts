import express from "express";
import { validateRequest } from "../../../../middlewares/validateRequest";
import { MerchantSignin, MerchantSignup } from "./merchants.controller";
import { SigninSchema, SignupSchema } from "../shared/auth.model";
import { Signout } from "../shared/auth.controller";


const router = express.Router();

router.post('/signup', validateRequest({ body: SignupSchema }), MerchantSignup);
router.post('/signin', validateRequest({ body: SigninSchema }), MerchantSignin);
router.post('/signout', Signout);

export { router as AuthMerchantsRoute }