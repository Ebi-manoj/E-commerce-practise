import { ProductCategory } from '../models/prodCategoryModel.js';
import asyncHandler from 'express-async-handler';
import { validateId } from '../utilitis/validate-id.js';

///////////////////////////////////////////////////////////////
//////CREATE CATEGORY

export const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await ProductCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////
//////////UPDATE CATEGORY

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const updated = await ProductCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    throw new Error(error);
  }
});

/////////////////////////////////////////////////////////////
////////////DELETE CATEGORY

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const deleted = await ProductCategory.findByIdAndDelete(id, req.body, {
      new: true,
    });
    res.json(deleted);
  } catch (error) {
    throw new Error(error);
  }
});

///////////////////////////////////////////////////////////////////////////
////////////GET A CATEGORY

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const category = await ProductCategory.findById(id);
    res.json(category);
  } catch (error) {
    throw new Error(error);
  }
});
export const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const allCategory = await ProductCategory.find();
    res.json(allCategory);
  } catch (error) {
    throw new Error(error);
  }
});
