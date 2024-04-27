import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
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
  userRef: {
    type: String,
    required: true,
  },
});

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;
