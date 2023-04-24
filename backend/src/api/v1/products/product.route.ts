import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest";
import { CreateProductSchema, ProductIdSchema, UpdateProductSchema } from "./product.model";
import { CreateProduct, EditProduct, GetAllProduct, GetProductById, RemoveProductById } from "./product.controller";
import { VariantGroupRoute } from "./variant-groups/variant-groups.route";
import { VariantsRoute } from "./variants/variants.route";
const router = express.Router();


router.use('/:prod_id/variant_groups', VariantGroupRoute);
router.use('/:prod_id/variants', VariantsRoute);

router.post('/', validateRequest({ body: CreateProductSchema }), CreateProduct);
router.put('/:prod_id', validateRequest({ params: ProductIdSchema, body: UpdateProductSchema }), EditProduct);
router.get('/:prod_id', validateRequest({ params: ProductIdSchema }), GetProductById);
router.delete('/:prod_id', validateRequest({ params: ProductIdSchema }), RemoveProductById);
router.get('/', GetAllProduct);


export { router as ProductRoute }