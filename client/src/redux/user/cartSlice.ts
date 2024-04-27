// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 6,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.cartQuantity += 1;
        toast.info(`Increased ${existingItem.title} product quantity`, {
          position: "bottom-left",
        });
      } else {
        const newProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(newProduct);
        toast.success(`${newProduct.title} added to cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTotals(state, action) {
      // eslint-disable-next-line prefer-const
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `Increased ${state.cartItems[itemIndex].title} product quantity`,
          {
            position: "bottom-left",
          }
        );
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCartSlice(state, action) {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      toast.success("Product removed from cart", {
        position: "bottom-left",
      });
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    },
  },
});
export const {
  addToCartSlice,
  getTotals,
  decreaseCart,
  increaseCart,
  removeFromCartSlice,
} = cartSlice.actions;

export default cartSlice.reducer;
