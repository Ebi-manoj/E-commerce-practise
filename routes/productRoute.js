import express from 'express';
import { createProduct, getaProduct } from '../controller/productCtrl.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getaProduct);

export default router;
