import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/2aiexDIP0PEuEDh0_kidssweaterorange_400x.jpg";
import img2 from "../assets/bJMvrYGrJRFL5W7b_Mens-Ireti-African-Print-Color-Blocked-Button-Up-Shirt-Black-Red-Kente-1_400x.jpg";
import img3 from "../assets/comPtDZsokx7tdik_african-shift-dress-in-black-dashiki-890854_270x360_crop_center.jpg";
import img4 from "../assets/uNlh9LJ0xwJERddV_african-t-shirt-in-blue-kente-207063_270x360_crop_center.jpg";
import img5 from "../assets/RwbYCPy9iCszDtVc_Mens-Karim-Embroidered-Traditional-Top-Black-with-Gold-Embroidery_400x.jpg";
import img6 from "../assets/YY4VjjvcappzmM1a_Mens-Ibrahim-African-Print-Traditional-Shirt-Blue-Navy-Mudcloth-1_5f751519-bcb2-4107-b727-7e65eb3d4bc1_400x.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { CiHeart, CiShoppingCart, CiStar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

const NewProducts = () => {
  const [slidesPerView, setSlidesPerView] = useState(3);

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

  const slides = [
    {
      img: img1,
      title: "Kids Sweater Orange",
      stars: 5,
      price: "$27.00",
    },
    {
      img: img2,
      title: "Lekan Blue Gold Adinkra",
      stars: 5,
      price: "$45.00",
    },
    {
      img: img3,
      title: "African Shift Dress In Black Dashiki",
      stars: 5,
      price: "$60.00",
    },
    {
      img: img4,
      title: "African T Shirt In Blue Kente",
      stars: 5,
      price: "$30.00",
    },
    {
      img: img5,
      title: "Traditional Top Black with Gold Embroidery",
      stars: 5,
      price: "$30.00",
    },
    {
      img: img6,
      title: "Traditional Shirt Blue Navy Mudcloth",
      stars: 5,
      price: "$30.00",
    },
  ];

  return (
    <div className="max-w-[1460px] h-fit py-20 mx-auto flex flex-col gap-10  ">
      <div className="flex flex-col items-center gap-6">
        <span className="capitalize text-3xl md:text-4xl ">New Products</span>
        <div className="w-20 h-1 bg-black" />
      </div>

      <div className="relative flex gap-2 pl-24 items-center ">
        <Swiper
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance using r
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col">
                <div className="overflow-hidden">
                  <div className="relative overflow-hidden w-[296px] h-[368px] group">
                    <img
                      src={slide.img}
                      className="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-150 origin-right"
                      alt=""
                    />
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3">
                        <CiHeart />
                      </span>
                      <span className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3">
                        <CiShoppingCart />
                      </span>
                      <span className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3">
                        <FaEye />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center">
                  <div className="flex gap-2  mt-3">
                    {[...Array(slide.stars)].map((_, i) => (
                      <span key={i}>
                        <CiStar />
                      </span>
                    ))}
                  </div>
                  <span className="capitalize">{slide.title}</span>
                  <span className="font-bold">{slide.price}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={goPrev}
          className="px-4 py-2 bg-white border rounded-l-lg text-black text-xl"
        >
          <MdOutlineNavigateBefore />
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-white border rounded-r-lg text-black text-xl"
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default NewProducts;
