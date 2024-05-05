import cartBG from "../assets/cartBg.webp";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useRef } from "react";
import axios from "axios";
import useUserCart from "../components/UserCart";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCart, increaseCart } from "../redux/user/cartSlice";
import PayButton from "../components/PayButton";
import { RootState } from "../redux/store";
import { motion, useInView } from "framer-motion";

interface CartItem {
  _id: string;
  image: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

const CartPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { removeFromCart, userCart, error, setUserCart } = useUserCart();
  console.log(userCart);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const errorMessage = error?.response?.data?.message;
  const handleDecreaseCart = async (product: CartItem) => {
    try {
      // Make a POST request to the decreaseCartQuantity endpoint with the cart item ID
      const response = await axios.post(`/api/cart/decrease/${product._id}`);

      // Update the userCart state with the updated cart data
      setUserCart((prevCart) =>
        prevCart?.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      if (response?.status === 200) {
        console.log("increased");
        dispatch(decreaseCart({ id: product?.productId }));
      }

      // Handle success response
      console.log(response.data.message); // Log success message or update UI accordingly
    } catch (error) {
      // Handle error
      console.error("Error decreasing cart item quantity:", error);
    }
  };

  const handleIncreaseCart = async (productId: CartItem) => {
    console.log(productId._id);
    try {
      // Make a POST request to the increaseCartQuantity endpoint with the cart item ID
      const response = await axios.post(`/api/cart/increase/${productId._id}`);

      // Update the userCart state with the updated cart data
      setUserCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      if (response?.status === 200) {
        console.log("increased");
        dispatch(increaseCart({ id: productId?.productId }));
      }

      // Handle success response
      console.log(response); // Log success message or update UI accordingly
    } catch (error) {
      // Handle error
      console.error("Error increasing cart item quantity:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRemoveFromCart = async (product: any) => {
    await removeFromCart(product);
    // Optionally, you can perform additional actions after removing the product from the cart
  };

  useEffect(() => {
    if (userCart) {
      console.log("User Cart:", userCart);
      // Do something with the userCart data
    }
  }, [userCart]);

  let totalAmount = 0;

  // Iterate over each item in the userCart array
  userCart?.forEach((item: { quantity: number; price: number }) => {
    // Calculate the subtotal for the current item
    const subtotal = item.quantity * item.price;

    // Add the subtotal to the total amount
    totalAmount += subtotal;
  });

  // Now totalAmount variable holds the total amount

  const AnimatedTableRow = ({
    item,
    handleIncreaseCart,
    handleDecreaseCart,
    handleRemoveFromCart,
  }: {
    item: CartItem;
    handleIncreaseCart: (product: CartItem) => void;
    handleDecreaseCart: (product: CartItem) => void;
    handleRemoveFromCart: (product: CartItem) => void; // Consider specifying a more precise type if possible
  }) => {
    const ref = useRef(null);
    const inView = useInView(ref, {
      once: true, // Trigger animation only once when it comes into view
    });

    // useEffect(() => {
    //   if (inView) {
    //     // Trigger animation when the row comes into view
    //   }
    // }, [inView]);

    return (
      <motion.tr
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-200"
      >
        <td className="p-3 border border-gray-200">
          <img
            src={item.image}
            alt={item.name}
            className="w-[120px] h-[120px] object-cover"
          />
        </td>
        <td className="p-3 border border-gray-200">{item.name}</td>
        <td className="p-6 mt-6 border border-gray-200">{item.productId}</td>
        <td className="p-3 border border-gray-200">
          <div className="flex px-3 py-3  gap-3 items-center ">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => handleIncreaseCart(item)}
                className="bg-gray-500 px-3 py-2 text-white"
              >
                +
              </button>
              <td className="py-1 px-2 rounded-sm border border-gray-200">
                {item.quantity}
              </td>
              <button
                onClick={() => handleDecreaseCart(item)}
                className="bg-gray-500 px-3 py-2 text-white"
              >
                -
              </button>
            </div>
            <span
              onClick={() => handleRemoveFromCart(item)}
              className="text-lg text-white bg-red-600 px-3 py-2 cursor-pointer hover:bg-red-500"
            >
              <MdOutlineDeleteOutline />
            </span>
          </div>
        </td>
        <td className="p-3 border border-gray-200">${item.price}</td>
        <td className="p-3 border border-gray-200">
          ${item.quantity * item.price}
        </td>
      </motion.tr>
    );
  };

  return (
    <div className="h-fit ">
      <div className="relative flex flex-col items-center ">
        <img
          src={cartBG}
          style={{ filter: "brightness(40%)" }}
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute flex gap-3 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-bold text-2xl">Shopping Cart</span>
          <div className="flex text-white items-center gap-2">
            <Link to={"/"}>
              <FaHouse />
            </Link>

            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Shopping Cart</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 py-20 overflow-auto">
        <table className=" border-collapse border border-gray-200 w-full overflow-auto">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-left border border-gray-200">Image</th>
              <th className="p-3 text-left border border-gray-200">
                Product Name
              </th>
              <th className="p-3 text-left border border-gray-200">Model</th>
              <th className="p-3 text-left border border-gray-200">Quantity</th>
              <th className="p-3 text-left border border-gray-200">
                Unit Price
              </th>
              <th className="p-3 text-left border border-gray-200">Total</th>
            </tr>
          </thead>
          <tbody>
            {userCart?.length < 1 ? (
              // Render a message indicating zero wishlist itemss
              <tr>
                <td colSpan={5} className="p-3 text-center">
                  {errorMessage || user?.currentUser === null
                    ? " Please Login to view your cart"
                    : " You have zero items in your Cart."}
                </td>
              </tr>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              userCart?.map((item: any, index) => (
                <AnimatedTableRow
                  key={index}
                  item={item}
                  handleIncreaseCart={handleIncreaseCart}
                  handleDecreaseCart={handleDecreaseCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              ))
            )}
          </tbody>
        </table>
        <div className="bg-gray-100 border w-[250px] h-fit py-4 shadow-xl mt-8 float-right  ">
          <div className="flex flex-col px-3  ">
            <span className="self-center font-semibold opacity-90">
              {userCart?.length} items is in your bag
            </span>
            <div className="flex flex-col gap-4 px-4  mt-8 ">
              <div className="w-full h-[1px] bg-gray-400 " />
              <div className="w-full h-[1px] bg-gray-400  " />
            </div>
            <div className="flex gap-3 px-3 justify-between py-3">
              <span className="font-bold">Subtotal :</span>
              <span>${totalAmount}</span>
            </div>
            <div className="flex flex-col gap-4 px-4  mt-8">
              <div className="w-full h-[1px] bg-gray-400 " />
              <div className="w-full h-[1px] bg-gray-400 " />
            </div>
            <div className="flex gap-3 px-3 justify-between py-3">
              <span className="font-bold">Total :</span>
              <span>${totalAmount}</span>
            </div>
            <div className="w-full h-[1px] bg-gray-400 " />
            <div className="hover:bg-gray-500 cursor-pointer text-center text-white bg-black transition-all py-3 px-4 w-full">
              <PayButton cartItems={userCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
