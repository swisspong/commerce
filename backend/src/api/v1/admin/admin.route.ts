import express from "express";
// import { CreateCategory, EditCategory, GetAllCategory } from "./categories.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { PermissionRoute } from "./permissions/permissions.route";
import { RoleRoute } from "./roles/roles.route";
// import { AddItemToCart, CreateCart, EditItemInCartById, EmptyCart, GetCartInfoByCartId, RemoveItemInCartById } from "./carts.conroller";
// import { AddItemToCartSchema, CartIdSchema, ItemIdSchema, UpdateItemInCartSchema } from "./carts.model";


const router = express.Router();

router.use('/permissions', PermissionRoute)
router.use('/role', RoleRoute);

// router.get('/', CreateCart);
// router.get('/:cart_id', validateRequest({ params: CartIdSchema }), GetCartInfoByCartId);
// router.delete('/cart_id', validateRequest({ params: CartIdSchema }), EmptyCart);
// router.post('/:cart_id', validateRequest({ params: CartIdSchema, body: AddItemToCartSchema }), AddItemToCart);
// router.put('/:cart_id/items/:item_id', validateRequest({ params: ItemIdSchema, body: UpdateItemInCartSchema }), EditItemInCartById);
// router.delete('/:cart_id/items/:item_id', validateRequest({ params: ItemIdSchema, }), RemoveItemInCartById);





export { router as AdminRoute }