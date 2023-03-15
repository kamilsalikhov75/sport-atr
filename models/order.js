import mongoose from 'mongoose';

const OrderProductSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: [OrderProductSchema],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'Создан',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model('Order', OrderSchema);
