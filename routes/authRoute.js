import express from 'express';
import {
  createUser,
  delteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateuser,
} from '../controller/userCtrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/all-users', getAllUsers);
router.get('/:id', authMiddleware, getUser);
router.put('/:id', updateuser);
router.delete('/:id', delteUser);

export default router;
