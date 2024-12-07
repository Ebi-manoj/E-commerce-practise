import { Cart } from '../models/cartModel.js';
import { Product } from '../models/productModel.js';
import { validateId } from '../utilitis/validate-id.js';
import asyncHandler from 'express-async-handler';

/////////////////////////////////////////////////////////////////////
//////////ADD TO CART

export const addToCart = asyncHandler(async (req, res) => {
  const { id: productId, quantity, color } = req.body;

  const UserId = req.user._id;
  validateId(UserId);
  validateId(productId);
  if (!quantity || quantity <= 0 || !color) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input: Quantity and color are required',
    });
  }

  try {
    let cart = await Cart.findOne({ orderby: UserId });
    if (!cart) {
      cart = new Cart({
        product: [],
        cartTotal: 0,
        orderby: UserId,
      });
    }
    const findProduct = await Product.findById(productId);
    const totalPrice = findProduct.price * quantity;

    const alreadyExisting = cart.product.findIndex(
      p => p.product.toString() === productId.toString() && p.color === color
    );
    if (alreadyExisting > -1) {
      cart.product[alreadyExisting].quantity += quantity;
    } else {
      cart.product.push({
        product: productId,
        quantity: Number(quantity),
        color: color,
        price: findProduct.price,
      });
    }
    cart.cartTotal += totalPrice;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////////////////
//////////////REMOVE CART
export const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const color = req.query.color;
  const UserId = req.user._id;
  validateId(id);
  validateId(UserId);
  try {
    const cart = await Cart.findOne({ orderby: UserId });
    const index = cart.product.findIndex(
      p => p.product.toString() === id.toString() && p.color === color
    );

    if (index === -1)
      return res.status(401).json({ message: 'Inavlid product' });
    const totalPrice = cart.product[index].quantity * cart.product[index].price;
    cart.cartTotal -= totalPrice;
    cart.product.splice(index, 1);
    await cart.save();
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
