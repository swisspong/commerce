import express from "express";
import { validateRequest } from "../../../../middlewares/validateRequest"
import { CreatePermissionSchema, PermissionIdSchema } from "./permissions.model";
import { CreatePermission, EditPermission, GetPermissionAll, GetPermissionById, RemovePermissionById } from "./permissions.controller";



const router = express.Router();

router.post('/', validateRequest({ body: CreatePermissionSchema }), CreatePermission);
router.get('/', GetPermissionAll)
router.get('/:permission_id', validateRequest({ params: PermissionIdSchema }), GetPermissionById);
router.delete('/:permission_id', validateRequest({ params: PermissionIdSchema, }), RemovePermissionById);
router.put('/:permission_id', validateRequest({ params: PermissionIdSchema, }), EditPermission)



export { router as PermissionRoute }