import { motion } from "framer-motion";
import { NAV_LINKS } from "../constants";

interface MobileNavProps {
  setOpenMobileNav: (value: boolean) => void;
  openMobileNav: boolean;
}
const MobileNav = ({ setOpenMobileNav, openMobileNav }: MobileNavProps) => {
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

  return (
    <div className="flex justify-center fixed z-40 w-full  ">
      <motion.div
        className="bg-white border border-gray-200 shadow-xl w-[80%] h-[200px]"
        initial="closed"
        animate={openMobileNav ? "open" : "closed"}
        variants={variants}
      >
        <div className="flex flex-col gap-4 justify-center py-5 px-4 font-semibold">
          {NAV_LINKS?.map((nav) => (
            <motion.span
              variants={spanVariants}
              className="cursor-pointer hover:text-gray"
              onClick={() => setOpenMobileNav(!openMobileNav)}
              key={nav.key}
            >
              {nav.label}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileNav;
