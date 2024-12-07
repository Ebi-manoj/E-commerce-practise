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

////////////////////////////////////////////////////////////////
//////LIKE THE BLOG

export const likeBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?._id;
  validateId(id);
  try {
    const blog = await Blog.findById(id);
    // check user is present in liked array
    const isLiked = blog.likes.includes(userId);

    if (isLiked) {
      // remove the user
      blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
    } else {
      blog.likes.push(userId);
      // remove from dislike[]
      blog.disLikes = blog.disLikes.filter(
        id => id.toString() === userId.toString()
      );
    }
    await blog.save();
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

export const dislikeBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?._id;
  validateId(id);
  try {
    const blog = await Blog.findById(id);
    const isDisliked = blog.disLikes.includes(userId);

    if (isDisliked) {
      blog.disLikes = blog.disLikes.filter(
        id => id.toString() !== userId.toString()
      );
    } else {
      blog.disLikes.push(userId);
      blog.likes = blog.likes.filter(id => id.toString() !== userId.toString());
    }
    await blog.save();
    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});

/////////////////////////////////////////////////////////////////////
////////////UPLOAD BLOG IMAGES

export const uploadBlogImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const findBlog = await Blog.findById(id);
    console.log(req.body);

    findBlog.images.push(...req.body.images);
    await findBlog.save();
    res.json(findBlog);
  } catch (error) {
    throw new Error({ message: 'Error in Uploading images', error });
  }
});
