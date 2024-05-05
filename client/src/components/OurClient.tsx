import { ImQuotesLeft } from "react-icons/im";
import OurCLientBg from "../assets/OurClient.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAnimation, motion, useInView } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { testimonies } from "../constants";
const OurClient = () => {
  const goNext = () => {
    if (swiperRef.current) {
      if (swiperRef.current.isEnd) {
        // If it reaches the last slide, go back to the first one
        swiperRef.current.slideTo(0);
      } else {
        swiperRef.current.slideNext();
      }
    }
    console.log("next");
  };
  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TestimonySlide = ({ quote, author, position }: any) => {
    return (
      <div className="flex flex-col gap-8 items-center">
        <span className="text-2xl md:text-6xl text-center ">
          <ImQuotesLeft />
        </span>
        <span className="text-center text-sm px-4 md:px-24 text-gray-400">
          {quote}
        </span>
        <div className="flex flex-col gap-2 items-center">
          <span className="text-sm md:text-lg font-semibold">{author}</span>
          <span className="text-xs text-gray-600">{position}</span>
        </div>
      </div>
    );
  };

  const TestimoniesSlider = () => {
    return (
      <Swiper
        pagination={{ clickable: true }}
        navigation={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {testimonies.map((testimony, index) => (
          <SwiperSlide key={index}>
            <TestimonySlide {...testimony} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const bgAnimation = useAnimation();
  const textAnimation = useAnimation();
  const testimoniesAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      // Background image animation
      bgAnimation.start({
        opacity: 1,
        transition: { duration: 1 },
      });
      // Text animation
      textAnimation.start({ opacity: 1, x: 10 });
      // Testimonies animation
      testimoniesAnimation.start({
        opacity: 1,
        transition: { duration: 0.8, delay: 1 },
      });
    }
  }, [inView, bgAnimation, textAnimation, testimoniesAnimation]);
  return (
    <div
      ref={ref}
      className="h-[100vh] lg:h-fit py-32 justify-start relative overflow-hidden"
    >
      <motion.div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${OurCLientBg})`,
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0,
        }}
        animate={bgAnimation}
        className="absolute top-0 left-0 z-0"
      />
      <div className="mt-16 flex flex-col items-center justify-center gap-2 lg:gap-8 capitalize px-3 lg:px-10">
        <motion.span
          className="font-semibold text-2xl md:text-4xl text-center text-white"
          initial={{ opacity: 0, x: -100 }}
          animate={textAnimation}
          transition={{ duration: 1 }}
        >
          Our Client says
        </motion.span>
        <div className="relative w-full md:w-[900px] md:h-[350px] bg-white shadow-xl py-8 gap-4">
          <button
            onClick={goPrev}
            className="absolute z-40 left-3 top-1/2 transform -translate-y-1/2"
          >
            {/* Left arrow */}
            <GrPrevious className="text-gray-400 text-3xl md:text-4xl" />
          </button>
          <button
            onClick={goNext}
            className="absolute z-40 right-3 top-1/2 transform -translate-y-1/2"
          >
            {/* Right arrow */}
            <GrNext className="text-gray-400 text-3xl md:text-4xl" />
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={testimoniesAnimation}
            className="w-full h-full"
          >
            <TestimoniesSlider />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurClient;
