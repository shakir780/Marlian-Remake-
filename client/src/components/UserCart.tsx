import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addToCartSlice,
  removeFromCartSlice,
} from "../redux/user/cartSlice.ts";
const useUserCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userCart, setUserCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    // Update cart length whenever userCart changes
    if (userCart) {
      setCartLength(userCart?.length);
    }
  }, [userCart]);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        if (user) {
          const response = await axios.get("/api/cart/get");
          setUserCart(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCart();
  }, [user]);

  console.log(cartLength);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFromCart = async (product: { _id: any; productId: any }) => {
    try {
      const response = await axios.delete(`/api/cart/delete/${product._id}`);
      console.log(response); // Assuming you want to log the response data

      // If the delete request is successful, filter out the deleted product from cartProduct
      if (response.status === 200) {
        dispatch(removeFromCartSlice({ id: product.productId }));
        setUserCart((prevCartProduct) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prevCartProduct?.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: { _id: any }) => item._id !== product._id
          )
        );
      }

      // toast.error("Product removed from cart", {
      //   position: "bottom-left",
      // });
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };
  const addToCart = async (product) => {
    // Initialize dispatch function

    try {
      // Make API call to add product to cart
      const response = await axios.post("/api/cart/add", {
        productId: product.id || product.productId,
        name: product.title,
        price: product.price,
        brand: product.brand,
        image: product.img,
        userRef: user._id,
        quantity: 1, // Assuming always adding 1 quantity for now
      });

      if (response?.message === "Unauthorized") {
        toast.info(`Please login or register to add to cart`, {
          position: "bottom-left",
        });
      }

      if (response.data.success) {
        dispatch(addToCartSlice(product));

        setUserCart((prevCart) => {
          const newCart = [...prevCart];
          newCart.push({ ...product, cartQuantity: 1 });
          return newCart;
        });

        // Update localStorage with the updated cart items AFTER updating the state
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...userCart, product])
        );
      } else {
        toast.error("Failed to add product to cart", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      if (error?.response?.data?.message === "Unauthorized") {
        toast.error(`Please Log In or Register to add to cart`, {
          position: "bottom-left",
        });
      }
      console.error("Error adding product to cart:", error);
    }
  };

  return {
    userCart,
    isLoading,
    error,
    removeFromCart,
    addToCart,
    setUserCart,
    cartLength,
  };
};

export default useUserCart;
