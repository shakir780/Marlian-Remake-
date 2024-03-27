import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/2aiexDIP0PEuEDh0_kidssweaterorange_400x.jpg";
import img2 from "../assets/bJMvrYGrJRFL5W7b_Mens-Ireti-African-Print-Color-Blocked-Button-Up-Shirt-Black-Red-Kente-1_400x.jpg";
import img3 from "../assets/comPtDZsokx7tdik_african-shift-dress-in-black-dashiki-890854_270x360_crop_center.jpg";
import img4 from "../assets/uNlh9LJ0xwJERddV_african-t-shirt-in-blue-kente-207063_270x360_crop_center.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

const FeaturedProducts = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  useEffect(() => {
    const handleResize = () => {
      // Adjust slidesPerView based on screen width
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1000) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(4);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  return (
    <div className="max-w-[1460px] h-fit py-20 mx-auto flex flex-col gap-10  ">
      <div className="flex flex-col items-center gap-6">
        <span className="capitalize text-3xl md:text-4xl ">
          Featured Products
        </span>
        <div className="w-20 h-1 bg-black" />
      </div>

      <div className="relative flex gap-2 pl-24 items-center ">
        <Swiper
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance using r
        >
          <SwiperSlide>
            <img
              src={img1}
              className="w-[280px] h-[280px] object-cover"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img2}
              className="w-[280px] h-[280px] object-cover"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img3}
              className="w-[280px] h-[280px] object-cover"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={img4}
              className="w-[280px] h-[280px] object-cover"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={goPrev}
          className="px-4 py-2 bg-white border rounded-l-lg text-blue-500 text-xl"
        >
          <MdOutlineNavigateBefore />
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-white rounded-r-lg text-blue-500 text-xl"
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
