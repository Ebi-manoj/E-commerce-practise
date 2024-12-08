import { Order } from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';
import { validateId } from '../utilitis/validate-id.js';
import uniqid from 'uniqid';
import { clearCart, UpdateProduct } from '../utilitis/order.js';

//////////////////////////////////////////////////////////////////////////
////////CREATE A ORDER

export const createOrder = asyncHandler(async (req, res) => {
  const { product, paymentDetails } = req.body;
  const userId = req.user._id;
  validateId(userId);
  for (const p of product) {
    validateId(p.productId);

    if (!p.quantity || p.quantity <= 0 || !p.color) {
      return res
        .status(400)
        .json({ message: 'Invalid product specifications' });
    }
  }
  try {
    await UpdateProduct(product);
    const newOrder = new Order({
      product: product.map(item => {
        return {
          product: item.productId,
          color: item.color,
          quantity: item.quantity,
          paymentIntent: {
            id: uniqid(),
            amount: paymentDetails.amount,
            currency: paymentDetails.currency,
            status: paymentDetails.status,
          },
        };
      }),

      orderby: userId,
    });

    await newOrder.save();
    await clearCart(userId, product);
    res.json(newOrder);
  } catch (error) {
    throw new Error(error);
  }
});
