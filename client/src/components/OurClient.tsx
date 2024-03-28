import { ImQuotesLeft } from "react-icons/im";
import OurCLientBg from "../assets/OurClient.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
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
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${OurCLientBg})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-[100vh] lg:h-fit py-32  justify-start"
    >
      <div className="mt-16 flex flex-col items-center justify-center gap-2 lg:gap-8 capitalize px-3 lg:px-10">
        <span className="font-semibold text-2xl md:text-4xl text-center text-white">
          Our Client says
        </span>
        <div className="relative w-full md:w-[900px] md:h-[350px] bg-white shadow-xl  py-8  gap-4 ">
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

          <Swiper
            pagination={{ clickable: true }}
            navigation={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <SwiperSlide>
              <div className="flex flex-col gap-8 items-center">
                <span className="text-2xl md:text-6xl text-center ">
                  <ImQuotesLeft />
                </span>
                <span className="text-center text-sm px-4 md:px-24 text-gray-400">
                  Alteration in some form injected humour words which don't even
                  slightly believable. If you are going use passage of Lorem
                  Ipsum, you need to be sure there isn't anything embarrassing
                  hidden Alteration some form injected humour words which don't
                  even slightly believable. If you going use passage humour
                  words which don't even slightly believable.
                </span>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm md:text-lg font-semibold">
                    Mr.Danail Smith
                  </span>
                  <span className="text-xs text-gray-600">Designer</span>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col gap-8 items-center">
                <span className="text-2xl md:text-6xl text-center ">
                  <ImQuotesLeft />
                </span>
                <span className="text-center text-sm px-4 md:px-24 text-gray-400">
                  Alteration in some form injected humour words which don't even
                  slightly believable. If you are going use passage of Lorem
                  Ipsum, you need to be sure there isn't anything embarrassing
                  hidden Alteration some form injected humour words which don't
                  even slightly believable. If you going use passage humour
                  words which don't even slightly believable.
                </span>
                <div className="flex flex-col gap-2 items-center">
                  <span className="text-sm md:text-lg font-semibold">
                    Mr.Danail Smith
                  </span>
                  <span className="text-xs text-gray-600">Designer</span>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default OurClient;
