import { CiCircleCheck } from "react-icons/ci";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

interface UserProps {
  user: {
    currentUser: {
      firstName: string;
      lastName: string;
    };
  };
}
const CheckoutSuccess = () => {
  const user = useSelector((state: UserProps) => state.user);
  const userName =
    user?.currentUser?.firstName + "   " + user?.currentUser?.lastName;
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.2,
      }}
      className="h-[100vh] flex justify-center py-20 px-2"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="flex gap-3 flex-col h-fit w-[500px] py-20 bg-white shadow-2xl rounded-md px-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center self-center text-6xl text-green-600"
        >
          <CiCircleCheck />
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg self-center capitalize"
        >
          Hey {userName}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl self-center"
        >
          Your Order is Confirmed!
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="self-center text-center"
        >
          We'll Send you a shipping confirmation email <br /> as soon as your
          order ships
        </motion.span>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cursor-pointer font-bold px-4 py-2 hover:opacity-90 text-white  bg-green-400 w-fit self-center"
          href={"/"}
        >
          Return Home
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutSuccess;
