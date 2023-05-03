import express from 'express';
import { validateRequest } from '../../../../middlewares/validateRequest';
import { CreateAdminRoleScdhema, DeleteManyAdminRoleSchema, UpdateAdminRoleSchema } from './authorization.model';
import { AuthorizationAdmin, EditAuthorization, GetAdminRoleAll, RemoveAdminRole } from './authorization.controller';
import { AdminIdSchema } from '../admin.model';

const router = express.Router({ mergeParams: true });

router.post('/', validateRequest({body: CreateAdminRoleScdhema, params: AdminIdSchema}), AuthorizationAdmin)
router.get('/', validateRequest({params: AdminIdSchema, }), GetAdminRoleAll)
router.delete('/', validateRequest({body: DeleteManyAdminRoleSchema, params: AdminIdSchema}), RemoveAdminRole)
router.put('/', validateRequest({body: UpdateAdminRoleSchema, params: AdminIdSchema}), EditAuthorization)
export { router as AuthorizationRoute}