import { Cart } from '../models/cartModel.js';
import { Product } from '../models/productModel.js';

export const clearCart = async (userId, products) => {
  try {
    const conditions = products.map(item => ({
      product: item.productId,
      color: item.color,
    }));
    console.log(products);

    const totalAmount = products.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    console.log(totalAmount);

    const updateCart = await Cart.findOneAndUpdate(
      { orderby: userId },
      {
        $pull: {
          product: { $or: conditions },
        },
        $inc: { cartTotal: -totalAmount },
      },

      { new: true }
    );
    console.log('hi from cart 2');

    if (!updateCart)
      throw new Error('Cart not found or no matching products to remove');
  } catch (error) {
    throw new Error(error);
  }
};

export const UpdateProduct = async product => {
  try {
    for (const item of product) {
      const updateProduct = await Product.findById(item.productId);
      if (!updateProduct) throw new Error('Product Not Found');
      if (updateProduct.quantity < item.quantity)
        throw new Error('No product left');
      updateProduct.quantity -= item.quantity;
      updateProduct.sold += item.quantity;
      await updateProduct.save();
    }
  } catch (error) {
    throw new Error(error);
  }
};
