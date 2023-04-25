import express from "express";
import { CustomerSignin, CustomerSignout, CustomerSignup } from "./customers.controller";
import { validateRequest } from "../../../../middlewares/validateRequest";
import { CustomerSigninSchema, CustomerSignupSchema } from "./customers.model";

const router = express.Router();

router.post('/signup', validateRequest({ body: CustomerSignupSchema }), CustomerSignup);
router.post('/signin', validateRequest({ body: CustomerSigninSchema }), CustomerSignin);
router.post('/signout', CustomerSignout);

export { router as AuthCustomersRoute }