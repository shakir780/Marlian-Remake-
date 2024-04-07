// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  wishListItems: localStorage.getItem("wishListItems")
    ? JSON.parse(localStorage.getItem("wishListItems"))
    : [],
};

const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const existingItem = state.wishListItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.wishListItems.push(action.payload);
        toast.success(`${action.payload.title} added to wishlist`, {
          position: "bottom-left",
        });
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishListItems)
        );
      } else {
        toast.info(`${action.payload.title} is already in the wishlist`, {
          position: "bottom-left",
        });
      }
    },
    removeFromWishList(state, action) {
      state.wishListItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextwishListItems = state.wishListItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.wishListItems = nextwishListItems;

          toast.error("Product removed from wishList", {
            position: "bottom-left",
          });
        }
        localStorage.setItem(
          "wishListItems",
          JSON.stringify(state.wishListItems)
        );
        return state;
      });
    },
  },
});

export const { addToWishlist, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
