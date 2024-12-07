import express from 'express';
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAllBlog,
  getBlog,
  likeBlog,
  updateBlog,
  uploadBlogImages,
} from '../controller/blogCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import { blogImgResize, uploadPhoto } from '../middlewares/uploadImages.js';

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);
router.put('/:id/like', authMiddleware, likeBlog);
router.put('/:id/dislike', authMiddleware, dislikeBlog);
router.post(
  '/:id/upload-images/blog',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 5),
  blogImgResize,
  uploadBlogImages
);

export default router;
