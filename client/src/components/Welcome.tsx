import { useAnimation, useInView, motion } from "framer-motion";
import WelcomePic from "../assets/pexels-photo-935985.webp";
import { useEffect, useRef } from "react";

const Welcome = () => {
  const controlsText = useAnimation();
  const controlsImage = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView) {
      controlsText.start({ opacity: 1, x: 0 });
      controlsImage.start({ opacity: 1, x: 0 });
    }
  }, [inView, controlsText, controlsImage]);
  return (
    <>
      <div
        ref={ref}
        className="h-[120vh] md:h-fit py-32 flex md:flex-row flex-col gap-7 mt-20 md:mt-0 px-4 justify-around items-center"
      >
        <motion.div
          className="flex flex-col gap-11 items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={controlsText}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col items-center gap-6">
            <span className="capitalize text-3xl md:text-4xl ">
              Welcome to our Store
            </span>
            <div className="w-20 h-1 bg-black" />
          </div>
          <div>
            <span className="text-gray-500 text-center ">
              Marlian is a black-owned, ready-to-wear bold print clothing line
              <br />
              offering quality, trendy African inspired fashion at affordable
              prices. <br />
              Marlian helps you celebrate the vibrant African culture, <br />
              and feel connected to your roots with every garment.
            </span>
          </div>
          <span className="bg-black text-white cursor-pointer px-4 py-2 w-fit opacity-80 uppercase">
            Read More
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={controlsImage}
          transition={{ duration: 1 }}
        >
          <img
            className="w-[400px] h-[300px] object-cover"
            src={WelcomePic}
            alt="Welcome"
          />
        </motion.div>
      </div>
    </>
  );
};

export default Welcome;
