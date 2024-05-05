import HeroBg from "../assets/Hero.jpeg";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroBg})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      className="h-[50vh] lg:h-fit py-32 justify-start"
      initial={{ opacity: 0, y: 100 }} // Initial animation states
      animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
      transition={{ duration: 1 }} // Animation duration
    >
      <motion.div
        className="mt-16 text-white flex flex-col gap-2 lg:gap-8 capitalize px-3 lg:px-10"
        initial={{ opacity: 0, y: 20 }} // Initial animation states
        animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
        transition={{ delay: 0.5, duration: 1 }} // Animation duration with delay
      >
        <motion.span
          className="text-xl lg:text-5xl font-semibold opacity-85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Trendy Africans <br /> Clothing
        </motion.span>
        <motion.span
          className="text-sm lg:text-xl opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Up to 50% off Best selling at $150.00
        </motion.span>
        <motion.span
          className="bg-slate-950 px-4 py-1 w-fit opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          shop now
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
