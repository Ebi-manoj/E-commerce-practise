import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getaProduct,
  updateProduct,
} from '../controller/productCtrl.js';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/:id', getaProduct);
router.get('/', getAllProduct);

export default router;
