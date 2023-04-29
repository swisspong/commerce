import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { PermissionRoute } from "./permissions/permissions.route";
import { RoleRoute } from "./roles/roles.route";
import { AdminIdSchema, CreateAdminSchema } from "./admin.model";
import { CreateAdmin, GetAdminAll ,GetAdminById, RemoveAdminById, EditAdmin} from "./admin.controller";



const router = express.Router();

router.use('/permissions', PermissionRoute)
router.use('/roles', RoleRoute);

router.post('/', validateRequest({body: CreateAdminSchema}) , CreateAdmin)
router.get('/', GetAdminAll)
router.get('/:admin_id', validateRequest({params: AdminIdSchema}) , GetAdminById)
router.delete('/:admin_id', validateRequest({params: AdminIdSchema}) , RemoveAdminById)
router.put('/:admin_id', validateRequest({params: AdminIdSchema}) , EditAdmin)

export { router as AdminRoute }