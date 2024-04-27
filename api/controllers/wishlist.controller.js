import WishList from "../models/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  try {
    // Extract  product details from the request body
    const userId = req.user.id;
    const { productId, name, price, brand, image } = req.body;

    // check if the wishlist already have a wishlist,create one if not

    let existingWishItem = await WishList.findOne({
      productId,
      userRef: userId,
    });
    console.log("Existing Item:", existingWishItem);
    if (existingWishItem) {
      console.log("already exist");
      return res.status(200).json({
        success: true,
        message: "Product already exists in the wishlist",
      });
    }

    // Save/update the wishlist Item to the database
    const wishlistItem = new WishList({
      productId,
      name,
      price,
      brand,
      image,
      userRef: userId,
    });
    await wishlistItem.save();
    return res.status(200).json({
      success: true,
      message: "Product added to the wishlist successfully",
    });
  } catch (error) {
    console.error("Error adding product to the wishlist: ", error);

    return res.status(500).json({
      success: false,
      message: "An error occcured while adding product to the wishList",
    });
  }
};

export const getWishList = async (req, res) => {
  try {
    const userId = req.user.id;
    const userwishListItems = await WishList.find({ userRef: userId });
    res.status(200).json(userwishListItems);
  } catch (error) {
    console.error("Error fetching user wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteWishList = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const deletedWishListItem = await WishList.findByIdAndDelete(productId); // Corrected
    if (!deletedWishListItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    res
      .status(200)
      .json({ message: "wishList deleted successfully", deletedWishListItem });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
