import express from 'express';
import {
  createCoupon,
  deleteCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
} from '../controller/couponCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createCoupon);
router.put('/:id', authMiddleware, isAdmin, updateCoupon);
router.get('/:id', authMiddleware, getCoupon);
router.get('/', authMiddleware, getCoupons);
router.delete('/:id', authMiddleware, deleteCoupon);

export default router;
