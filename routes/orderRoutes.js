import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createOrder } from '../controller/orderCtrl.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);

export default router;
