import express from "express";
// import { CreateCategory, EditCategory, GetAllCategory } from "./categories.controller";
import { validateRequest } from "../../../../middlewares/validateRequest"
import { CreatePermissionSchema, PermissionIdSchema } from "./permissions.model";
import { CreatePermission, EditPermission, GetPermissionAll, GetPermissionById, RemovePermissionById } from "./permissions.controller";
// import { AddItemToCart, CreateCart, EditItemInCartById, EmptyCart, GetCartInfoByCartId, RemoveItemInCartById } from "./carts.conroller";
// import { AddItemToCartSchema, CartIdSchema, ItemIdSchema, UpdateItemInCartSchema } from "./carts.model";


const router = express.Router();

router.post('/', validateRequest({ body: CreatePermissionSchema }), CreatePermission);
router.get('/', GetPermissionAll)
router.get('/:permission_id', validateRequest({ params: PermissionIdSchema }), GetPermissionById);
router.delete('/:permission_id', validateRequest({ params: PermissionIdSchema, }), RemovePermissionById);
router.put('/:permission_id', validateRequest({ params: PermissionIdSchema, }), EditPermission)



export { router as PermissionRoute }