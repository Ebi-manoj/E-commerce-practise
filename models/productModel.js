import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [],
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();
  this.slug = slugify(this.title);
  next();
});

//Export the model
export const Product = mongoose.model('product', productSchema);
