import express from 'express';
import {
  blockUser,
  createUser,
  delteUser,
  getAllUsers,
  getUser,
  handlerefreshToken,
  loginUser,
  resetPassword,
  resetPasswordRequest,
  unBlockUser,
  updateuser,
} from '../controller/userCtrl.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/refresh', handlerefreshToken);
router.get('/all-users', authMiddleware, isAdmin, getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.put('/edit-user', authMiddleware, updateuser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);
router.delete('/:id', delteUser);
router.post('/reset-password', authMiddleware, resetPasswordRequest);
router.put('/reset-password/:token', resetPassword);

export default router;
