import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

//Export the model
export const BlogCategory = mongoose.model('blogCategory', blogCategorySchema);
