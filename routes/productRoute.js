import express from 'express';
import {
  addRatings,
  createProduct,
  deleteProduct,
  filterDocuments,
  getAllProduct,
  getaProduct,
  updateProduct,
  uploadProductImages,
} from '../controller/productCtrl.js';
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import { productImgResize, uploadPhoto } from '../middlewares/uploadImages.js';
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/:id', getaProduct);
router.get('/', getAllProduct);
router.get('/', filterDocuments);
router.put('/:id/addratings', authMiddleware, addRatings);
router.post(
  '/:id/upload-images',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 5),
  productImgResize,
  uploadProductImages
);

export default router;
