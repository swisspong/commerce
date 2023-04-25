import express from "express";
import { AuthCustomersRoute } from "./customers/customers.route";
const router = express.Router()
router.use('/customers', AuthCustomersRoute);


export { router as AuthRouter }