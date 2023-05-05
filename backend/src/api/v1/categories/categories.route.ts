import { Router } from "express";
import { CreateCategory, EditCategory, GetAllCategory } from "./categories.controller";
import { validateRequest } from "../../../middlewares/validateRequest";
import { CreateCategoriesSchema, UpdateCategoriesSchema } from "./categories.model";


const router = Router();

router.post('/', validateRequest({ body: CreateCategoriesSchema }), CreateCategory);
router.get('/', GetAllCategory);


router.put('/', validateRequest({ body: UpdateCategoriesSchema }), EditCategory);



export { router as CategoryRoute }