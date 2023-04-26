import express from "express";
import { validateRequest } from "../../../../middlewares/validateRequest";
import { CustomerSignin,  CustomerSignup } from "./customers.controller";

import { SigninSchema, SignupSchema } from "../shared/auth.model";
import { Signout } from "../shared/auth.controller";

const router = express.Router();

router.post('/signup', validateRequest({ body: SignupSchema }), CustomerSignup);
router.post('/signin', validateRequest({ body: SigninSchema }), CustomerSignin);
router.post('/signout', Signout);

export { router as AuthCustomersRoute }