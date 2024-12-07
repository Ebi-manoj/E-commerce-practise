import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          count: Number,
          color: String,
        },
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not processed',
      enum: [
        'Not processed',
        'Cash on Deliver',
        'Dispatched',
        'Canceled',
        'Delivered',
      ],
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
export const Order = mongoose.model('Order', orderSchema);
