import mongoose from 'mongoose';

const prdctCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

//Export the model
export const ProductCategory = mongoose.model(
  'ProductCategory',
  prdctCategorySchema
);
