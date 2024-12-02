import asyncHandler from 'express-async-handler';
import { Product } from '../models/productModel.js';

/////////////////////////////////////////////////////////////////////
/////////CREATE A PRODUCT

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////////////
//////////GET A PRODUCT

export const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////
/////////GET ALL PRODUCTS

export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////////
/////UPDATE A PRODUCT

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'product not found' });

    Object.assign(product, req.body);

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////////
///////DELETE A PRODUCT

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json({ message: 'user Deleted', User: deleteProduct });
  } catch (error) {
    throw new Error(error);
  }
});
