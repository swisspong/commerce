import express from "express";

import { validateRequest } from "../../../../middlewares/validateRequest";

import { CreateVariantSchema, DeleteManyVariantSchema, UpdateManyVariantSchema } from "./variants.model";
import { CreateVariant, EditVariantArray, GetAllVariants, RemoveManyVariant } from "./variants.controller";
import { ProductIdSchema } from "../product.model";


const router = express.Router({ mergeParams: true });

router.post('/', validateRequest({ body: CreateVariantSchema, params: ProductIdSchema }), CreateVariant);
router.get('/', validateRequest({ params: ProductIdSchema }), GetAllVariants);
router.delete('/', validateRequest({ body: DeleteManyVariantSchema }), RemoveManyVariant);
router.put('/', validateRequest({ body: UpdateManyVariantSchema }), EditVariantArray);



export { router as VariantsRoute }