import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/user/cartSlice";

const CartCard = ({ openCartCard }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
      },
    },
    closed: {
      opacity: 0.2,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  const spanVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: -20,
    },
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="flex justify-end px-12 fixed z-50 w-full ">
      {cart?.cartItems?.length > 0 ? (
        <motion.div
          initial="closed"
          animate={openCartCard ? "open" : "closed"}
          variants={variants}
          className="w-[310px]  h-fit py-6 shadow-xl rounded-sm bg-white border-2 border-gray-200 "
        >
          <div className="flex flex-col gap-4 mt-5 h-[170px] overflow-y-scroll">
            {cart.cartItems?.map((c, i) => (
              <div key={i} className="flex gap-3 px-6 items-center">
                <motion.img
                  variants={spanVariants}
                  src={c.img}
                  className="w-[120px] h-[120px] object-cover"
                  alt=""
                />
                <motion.span
                  variants={spanVariants}
                  className="text-xs w-[80px]"
                >
                  {c.title}
                </motion.span>
                <div className="flex flex-col gap-1">
                  <span>x</span>
                  <motion.span variants={spanVariants}>
                    {c.cartQuantity}
                  </motion.span>
                </div>
                <motion.span variants={spanVariants}>
                  ${c.price * c.cartQuantity}
                </motion.span>

                <span
                  onClick={() => handleRemoveFromCart(c)}
                  className="bg-red-600 text-white px-2 py-[1px] cursor-pointer hover:bg-red-400 "
                >
                  X
                </span>
              </div>
            ))}
          </div>
          <hr />

          <div className="flex flex-col items-center px-10  gap-1 py-2">
            <div className="flex gap-8 w-full">
              <span className="text-lg font-semibold capitalize ">
                cart Quantity :
              </span>
              <span className="font-bold">{cart?.cartTotalQuantity}</span>
            </div>
            <div className="flex gap-8 w-full">
              <span className="text-lg font-semibold capitalize ">
                Total Amount :
              </span>
              <span className="font-bold">${cart?.cartTotalAmount}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4">
            <Link
              to={"/cart"}
              className="bg-gray-500 cursor-pointer text-center text-white hover:bg-black transition-all py-3 px-4 w-full"
            >
              <span>View Cart</span>
            </Link>
            <div className="hover:bg-gray-500 cursor-pointer text-center text-white bg-black transition-all py-3 px-4 w-full">
              <span>Checkout</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="closed"
          animate={openCartCard ? "open" : "closed"}
          variants={variants}
          className="w-[310px] flex justify-center  h-fit py-6 shadow-xl rounded-sm bg-white border-2 border-gray-200 "
        >
          <span className="capitalize">Your Shopping cart is empty !</span>
        </motion.div>
      )}
    </div>
  );
};

export default CartCard;
