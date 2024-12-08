import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
        },
        quantity: Number,
        color: String,
        paymentIntent: {
          id: String,
          amount: Number,
          currency: String,
          status: String,
        },
        orderStatus: {
          type: String,
          default: 'processing',
          enum: [
            'Not processed',
            'processing',
            'Processed',
            'Dispatched',
            'Canceled',
            'Delivered',
            'Shipped,',
          ],
        },
      },
    ],
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
