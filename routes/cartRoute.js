import express from 'express';
import { addToCart, removeFromCart } from '../controller/cartCtrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-cart', authMiddleware, addToCart);
router.put('/:id', authMiddleware, removeFromCart);

export default router;
