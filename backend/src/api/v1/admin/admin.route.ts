import express from "express";
// import { CreateCategory, EditCategory, GetAllCategory } from "./categories.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { PermissionRoute } from "./permissions/permissions.route";
import { RoleRoute } from "./roles/roles.route";
// import { AddItemToCart, CreateCart, EditItemInCartById, EmptyCart, GetCartInfoByCartId, RemoveItemInCartById } from "./carts.conroller";
// import { AddItemToCartSchema, CartIdSchema, ItemIdSchema, UpdateItemInCartSchema } from "./carts.model";


const router = express.Router();

router.use('/permissions', PermissionRoute)
router.use('/roles', RoleRoute);





export { router as AdminRoute }