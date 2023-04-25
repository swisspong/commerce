import express from 'express';
import { ProductRoute } from './products/product.route';
import { CategoryRoute } from './categories/categories.route';
import { CartsRoute } from './carts/carts.route';
import { AuthRouter } from './auth';

const router = express.Router();

router.use('/products', ProductRoute);
router.use('/categories', CategoryRoute)
router.use('/carts', CartsRoute)
router.use('/auth', AuthRouter)


export default router;