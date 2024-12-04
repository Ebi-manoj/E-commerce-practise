import { Blog } from '../models/blogModel.js';
import asyncHandler from 'express-async-handler';
import { validateId } from '../utilitis/validate-id.js';

/////////////////////////////////////////////////////////////
//////////CREATE NEW BLOG

export const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});
///////////////////////////////////////////////////////////////////////////////////
/////////////////UPDATE A BLOG
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);

  try {
    const updated = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    throw new Error(error);
  }
});

////////////////////////////////////////////////////////////////////
///////////GET A BLOG

export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const findBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { numViews: 1 } },
      { new: true }
    );
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});

//////////////////////////////////////////////////////////////////////
///////////GET ALL BLOG

export const getAllBlog = asyncHandler(async (req, res) => {
  try {
    const getBlogs = await Blog.find();
    res.json(getBlogs);
  } catch (error) {
    throw new Error(error);
  }
});

////////////////////////////////////////////////////////////////
//////////DELETE BLOG

export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json({ message: 'Blog deleted', Deleted: deleteBlog });
  } catch (error) {
    throw new Error(error);
  }
});
