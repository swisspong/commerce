import express from "express";

import { validateRequest } from "../../../../middlewares/validateRequest";
// import { GetAllVariantGroupsByProdId, UpsertVariantGroup } from "./variant-groups.controller";
// import { ProductIdSchema } from "../product.model";
// import { UpsertVariantGroupsSchema } from "./variant-groups.model";

const router = express.Router({ mergeParams: true });

// router.put('/', validateRequest({ body: UpsertVariantGroupsSchema }), UpsertVariantGroup);
// router.get('/', validateRequest({ params: ProductIdSchema }), GetAllVariantGroupsByProdId);


export { router as RoleRoute }
