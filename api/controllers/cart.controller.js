import { Types } from "mongoose";
import Cart from "../models/cart.model.js";
import { errorhandler } from "../utils/error.js";

export const addToCart = async (req, res) => {
  try {
    // Extract product details from request body
    const userId = req.user.id;
    const { productId, quantity, name, price, brand, image } = req.body;

    // Check if the user already has a cart, create one if not
    let cartItem = await Cart.findOne({ productId, userRef: userId });

    if (cartItem) {
      // If the product already exists in the user's cart, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If the product doesn't exist in the user's cart, create a new cart item
      cartItem = new Cart({
        productId,
        name,
        price,
        brand,
        image,
        quantity,
        userRef: userId,
      });
    }

    // Save/update the cart item in the database
    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Product added to the cart successfully",
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding product to the cart",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const userCartItems = await Cart.find({ userRef: userId });
    res.status(200).json(userCartItems);
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCartItems = async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    console.log(req.params.id);
    res
      .status(200)
      .json({ message: "Cart item has been deleted", deletedCartItem });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const increaseCartQuantity = async (req, res) => {
  try {
    // Extract user ID and cart item ID from request parameters
    const userId = req.user.id;
    const cartItemId = req.params.id;

    // Find the cart item by its ID and user reference
    const cartItem = await Cart.findOne({ _id: cartItemId, userRef: userId });

    // Check if the cart item exists
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Increase the quantity of the cart item by 1
    cartItem.quantity += 1;

    // Save the updated cart item
    await cartItem.save();

    // Return success response
    return res
      .status(200)
      .json({ message: "Quantity increased successfully", cartItem });
  } catch (error) {
    console.error("Error increasing cart item quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const decreaseCartQuantity = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    // Find the cart item by its ID
    const cartItem = await Cart.findById(cartItemId);

    // If the cart item doesn't exist, return a 404 response
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Decrement the quantity of the cart item
    cartItem.quantity -= 1;

    // Save the updated cart item
    await cartItem.save();

    // Send a success response
    return res.status(200).json({ message: "Quantity decreased successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error decreasing cart item quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
