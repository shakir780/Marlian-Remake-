/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store.ts";
type Product = {
  id: any;
  productId: any;
  title: any;
  name: any;
  price: any;
  brand: any;
  img: any;
  image: any;
  // Add other properties of the product as needed
};
type CartItem = {
  quantity: number;
  cartQuantity: number;
  id: any;
  _id: any;
  productId: any;
  name: any;
  price: any;
  brand: any;
  image: any;
};
const useUserCart = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const [userCart, setUserCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        if (user?.currentUser !== null) {
          const response = await axios.get("/api/cart/get");
          setUserCart(response.data);
        }
      } catch (error: any) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCart();
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFromCart = async (product: { _id: any; productId: any }) => {
    try {
      const response = await axios.delete(`/api/cart/delete/${product._id}`);
      console.log(response); // Assuming you want to log the response data

      // If the delete request is successful, filter out the deleted product from cartProduct
      if (response.status === 200) {
        setUserCart((prevCartProduct) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prevCartProduct?.filter((item) => item._id !== product._id)
        );
        toast.success(`Product deleted successfully`, {
          position: "bottom-left",
        });
      }

      // toast.error("Product removed from cart", {
      //   position: "bottom-left",
      // });
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };
  const addToCart = async (product: Product) => {
    // Initialize dispatch function

    try {
      // Make API call to add product to cart
      const response = await axios.post("/api/cart/add", {
        productId: product.id || product.productId,
        name: product?.title || product?.name,
        price: product?.price,
        brand: product?.brand,
        image: product?.img || product?.image,
        quantity: 1, // Assuming always adding 1 quantity for now
      });

      console.log(product);

      if (response.data.success && user?.currentUser !== null) {
        // if (existingProductIndex !== -1) {
        //   setUserCart((prevCart) => {
        //     const updatedCart = [...prevCart];
        //     updatedCart[existingProductIndex].cartQuantity += 1;
        //     toast.info(`Quantity of ${product?.title} increased`, {
        //       position: "bottom-left",
        //     });
        //     return updatedCart;
        //   });
        setUserCart((prevCart) => {
          const newCart = [...prevCart];
          newCart.push({
            ...product,
            cartQuantity: 1,
            // You might want to remove these lines if you're fetching the product details from response.data
            _id: undefined,
            quantity: 0,
            name: undefined,
            image: undefined,
          });
          toast.success(
            `Product ${product?.title || product?.name} added successfully`,
            {
              position: "bottom-left",
            }
          );
          return newCart;
        });

        // Update localStorage with the updated cart items AFTER updating the state
        localStorage.setItem(
          "cartItems",
          JSON.stringify([...userCart, product])
        );
      } else {
        if (user?.currentUser === null) {
          {
            toast.error("Please Log In or Register to add to cart", {
              position: "bottom-left",
            });
          }
        } else {
          toast.error("Failed to add product to cart", {
            position: "bottom-left",
          });
        }
      }
    } catch (error: any) {
      if (error?.response?.data?.message === "Unauthorized") {
        toast.error(`Please Log In or Register to add to cart`, {
          position: "bottom-left",
        });
        navigate("/login");
      }
      console.error("Error adding product to cart:", error);
    }
  };

  return {
    userCart,
    isLoading,
    removeFromCart,
    addToCart,
    setUserCart,
    error,
  };
};

export default useUserCart;
