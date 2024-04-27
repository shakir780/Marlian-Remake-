import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  brand: {
    type: String,
  },
  image: {
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
