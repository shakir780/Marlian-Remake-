import axios from "axios";
import { useSelector } from "react-redux";
import { TbProgress } from "react-icons/tb";
import { useState } from "react";
import { motion } from "framer-motion";
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
interface PayButtonProps {
  cartItems: CartItem[];
}
interface RootState {
  user: {
    currentUser: {
      _id: string;
      // Add other properties of the user object as needed
    };
  };
  // Add other state properties as needed
}
const PayButton: React.FC<PayButtonProps> = ({ cartItems }) => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  const handleCheckout = async () => {
    setLoading(true); // Set loading to true when checkout process starts
    try {
      const res = await axios.post(`api/stripe/create-checkout-session`, {
        cartItems,
        userId: user.currentUser._id,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Set loading back to false when checkout process completes (whether success or failure)
    }
  };

  return (
    <>
      <button onClick={() => handleCheckout()} disabled={loading}>
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-lg"
          >
            <TbProgress />
          </motion.div>
        ) : (
          "Check out"
        )}
      </button>
    </>
  );
};

export default PayButton;
