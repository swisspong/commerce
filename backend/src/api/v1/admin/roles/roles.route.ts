import express from "express";
// import { CreateCategory, EditCategory, GetAllCategory } from "./categories.controller";
import { validateRequest } from "../../../../middlewares/validateRequest"
import { CreateRole, EditRole, GetRoleAll, GetRoleById, RemoveRoleById } from "./roles.conroller";
import { CreateRoleSchema, RoleIdSchema } from "./roles.model";


const router = express.Router();

router.post('/', validateRequest({ body: CreateRoleSchema }), CreateRole);
router.get('/', GetRoleAll)
router.get('/:role_id', validateRequest({ params: RoleIdSchema }), GetRoleById);
router.delete('/:role_id', validateRequest({ params: RoleIdSchema }), RemoveRoleById)
router.put('/:role_id', validateRequest({ params: RoleIdSchema }), EditRole)
export { router as RoleRoute }