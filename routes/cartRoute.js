import express from 'express';
import {
  addToCart,
  applyCoupon,
  getAllCart,
  removeFromCart,
} from '../controller/cartCtrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllCart);
router.post('/add-cart', authMiddleware, addToCart);
router.put('/apply-coupon', authMiddleware, applyCoupon);
router.put('/:id', authMiddleware, removeFromCart);

export default router;
