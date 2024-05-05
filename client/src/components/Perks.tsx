import { useAnimation, useInView, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { GiReturnArrow } from "react-icons/gi";
import { PiMoneyBold } from "react-icons/pi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

interface PerksCompProps {
  icon: React.ReactNode;
  title: string;
  sub: string;
}
const Perks = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.4 }, // Adjust the delay as needed
      }));
    }
  }, [controls, inView]);
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  const PerksComp = ({ icon, title, sub }: PerksCompProps) => (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 items-center"
    >
      <span className="text-4xl">{icon}</span>
      <span className="font-semibold capitalize text-center">{title}</span>
      <span className="text-gray-400 text-center">{sub}</span>
    </motion.div>
  );
  return (
    <div ref={ref} className="md:max-w-[1460px] h-fit lg:h-fit py-32">
      <div className="md:mx-auto grid grid-cols-2 px-3 md:px-10 md:grid-cols-3  gap-10 justify-center items-center">
        <motion.div
          custom={0}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
        >
          <PerksComp
            icon={<BsSend />}
            title="Worldwide Shipping"
            sub="Order above $100"
          />
        </motion.div>
        <motion.div
          custom={1}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
        >
          <PerksComp
            icon={<GiReturnArrow />}
            title="Easy 30 Days Returns"
            sub="Back return in 7 days"
          />
        </motion.div>
        <motion.div
          custom={2}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
        >
          <PerksComp
            icon={<FaRegThumbsUp />}
            title="Quality Support"
            sub="Praesent Pulviner Neque"
          />
        </motion.div>
        <motion.div
          custom={3}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
        >
          <PerksComp
            icon={<PiMoneyBold />}
            title="Money back Gurantee"
            sub="Gurantee back within 30 days"
          />
        </motion.div>
        <motion.div
          custom={4}
          animate={controls}
          initial={{ opacity: 0, y: 50 }}
        >
          <PerksComp
            icon={<TfiHeadphoneAlt />}
            title="Easy online Support"
            sub="Any time support"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Perks;
