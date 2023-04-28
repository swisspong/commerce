import express from 'express';
import { ProductRoute } from './products/product.route';
import { CategoryRoute } from './categories/categories.route';
import { CartsRoute } from './carts/carts.route';
import { AdminRoute } from './admin/admin.route';
import { CheckoutRoute } from './checkout/checkout.route';
import { AuthRoute } from './auth';


const router = express.Router();

router.use('/products', ProductRoute);
router.use('/categories', CategoryRoute)
router.use('/carts', CartsRoute)
router.use('/auth', AuthRoute)
router.use('/admin', AdminRoute)
router.use('/checkout',CheckoutRoute)

export default router;