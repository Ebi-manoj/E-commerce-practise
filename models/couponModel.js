import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },

  expiry: {
    type: Date,
    required: true,
  },
  discount: {
    type: Number,
  },
});

//Export the model
export const Coupon = mongoose.model('Coupon', couponSchema);
