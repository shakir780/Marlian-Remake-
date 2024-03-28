import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Company1 from "../assets/1-130x87.png";
import Company2 from "../assets/3-130x87.png";
import Company4 from "../assets/4-130x87.png";
import Company5 from "../assets/5-130x87.png";
import Company6 from "../assets/6-130x87.png";
import Company7 from "../assets/7-130x87.png";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const Companies = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };
  const goNext = () => {
    if (swiperRef.current) {
      if (swiperRef.current.isEnd) {
        // If it reaches the last slide, go back to the first one
        swiperRef.current.slideTo(0);
      } else {
        swiperRef.current.slideNext();
      }
    }
  };
  useEffect(() => {
    const handleResize = () => {
      // Adjust slidesPerView based on screen width
      if (window.innerWidth < 640) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1000) {
        setSlidesPerView(4);
      } else {
        setSlidesPerView(6);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set initial slidesPerView
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="h-fit py-10">
      <div className="h-fit py-20 relative">
        <div className="relative  flex gap-2 px-4 items-center w-full ">
          <button
            onClick={goPrev}
            className="px-4 py-2 bg-white border rounded-l-lg text-black text-xl"
          >
            <MdOutlineNavigateBefore />
          </button>
          <Swiper
            slidesPerView={slidesPerView}
            pagination={{ clickable: true }}
            navigation={false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <SwiperSlide>
              <img className="object-cover" src={Company1} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="object-cover" src={Company2} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="object-cover" src={Company4} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="object-cover" src={Company5} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="object-cover" src={Company6} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="object-cover" src={Company7} />
            </SwiperSlide>
            <SwiperSlide>
              <img className="object-cover" src={Company1} />
            </SwiperSlide>
          </Swiper>
          <button
            onClick={goNext}
            className="px-4 py-2 mr-4 bg-white border rounded-r-lg text-black text-xl"
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Companies;
