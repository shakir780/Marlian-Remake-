import { useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import PayButton from "./PayButton";
import { useEffect, useRef } from "react";
import useUserCart from "./UserCart";
import { RootState } from "../redux/store";

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
interface CartCardProps {
  openCartCard: boolean;
  setOpenCartCard: (value: boolean) => void;
}
interface ProductsProps {
  quantity?: number;
  cartQuantity?: number;
  id?: string;
  _id: string;
  productId: number;
  title?: string;
  price?: number;
  brand?: string;
  image?: string;
}
interface CartItemProps {
  item: {
    image: string;
    name: string;
    quantity: number;
    price: number;
  };
  handleRemoveFromCart: (item: {
    image: string;
    name: string;
    quantity: number;
    price: number;
    _id: string; // Add this line
    productId: number; // Add this line
  }) => void;
}

const CartItem = ({ item, handleRemoveFromCart }: CartItemProps) => {
  useEffect(() => {
    // Add animation logic here if needed
  }, []); // Make sure to adjust dependencies if needed
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true, // Trigger animation only once when it comes into view
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="flex gap-3 px-6 items-center"
    >
      <motion.img
        variants={spanVariants}
        src={item.image}
        className="w-[120px] h-[120px] object-cover"
        alt=""
      />
      <motion.span variants={spanVariants} className="text-xs w-[80px]">
        {item.name}
      </motion.span>
      <div className="flex flex-col gap-1">
        <span>x</span>
        <motion.span variants={spanVariants}>{item.quantity}</motion.span>
      </div>
      <motion.span variants={spanVariants}>
        ${item.price * item.quantity}
      </motion.span>
      <span
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={() => handleRemoveFromCart(item)}
        className="bg-red-600 text-white px-2 py-[1px] cursor-pointer hover:bg-red-400 "
      >
        X
      </span>
    </motion.div>
  );
};

const CartCard = ({ openCartCard, setOpenCartCard }: CartCardProps) => {
  const user = useSelector((state: RootState) => state.user);
  const { userCart, removeFromCart } = useUserCart();

  const handleRemoveFromCart = async (product: ProductsProps) => {
    await removeFromCart(product);
    // Optionally, you can perform additional actions after removing the product from the cart
  };
  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpenCartCard(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (userCart) {
      console.log("User Cart:", userCart);
      // Do something with the userCart data
    }
  }, [userCart]);
  console.log(userCart?.length);

  let totalAmount = 0;

  // Iterate over each item in the userCart array
  userCart?.forEach((item: { quantity: number; price: number }) => {
    // Calculate the subtotal for the current item
    const subtotal = item.quantity * item.price;

    // Add the subtotal to the total amount
    totalAmount += subtotal;
  });

  return (
    <div className="flex justify-end px-12 fixed z-50 w-full ">
      {userCart?.length > 0 ? (
        <div
          ref={wrapperRef}
          className="w-[310px]  h-fit py-6 shadow-xl rounded-sm bg-white border-2 border-gray-200 "
        >
          <div className="flex flex-col gap-4 mt-5 h-[170px] overflow-y-scroll">
            {userCart?.map((c, i) => (
              <CartItem
                key={i}
                item={c}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
          <hr />

          <div className="flex flex-col items-center px-10  gap-1 py-2">
            <div className="flex gap-8 w-full">
              <span className="text-lg font-semibold capitalize ">
                cart Quantity :
              </span>
              <span className="font-bold">{userCart?.length}</span>
            </div>
            <div className="flex gap-8 w-full">
              <span className="text-lg font-semibold capitalize ">
                Total Amount :
              </span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4">
            <Link
              to={"/cart"}
              onClick={() => setOpenCartCard(false)}
              className="bg-gray-500 cursor-pointer text-center text-white hover:bg-black transition-all py-3 px-4 w-full"
            >
              <span>View Cart</span>
            </Link>
            <div className="hover:bg-gray-500 cursor-pointer text-center text-white bg-black transition-all py-3 px-4 w-full">
              <span>
                {" "}
                <PayButton cartItems={userCart} />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial="closed"
          animate={openCartCard ? "open" : "closed"}
          variants={variants}
          className="w-[310px] flex justify-center  h-fit py-6 shadow-xl rounded-sm bg-white border-2 border-gray-200 "
        >
          <span className="capitalize">
            {" "}
            {user?.currentUser
              ? "Your Shopping Cart is Empty"
              : "Login In to view your cart"}{" "}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default CartCard;
