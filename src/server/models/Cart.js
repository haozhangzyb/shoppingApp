import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      name: {
        type: String,
      },

      price: {
        type: Number,
      },

      image_url: {
        type: String,
      },

      inCartQuantity: {
        type: Number,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  subtotal: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  coupons: [
    {
      id: String,
      code: String,
      discount: Number,
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.cart || mongoose.model("cart", CartSchema);
