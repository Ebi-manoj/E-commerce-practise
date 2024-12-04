import express from 'express';
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  updateBlog,
} from '../controller/blogCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

export default router;
