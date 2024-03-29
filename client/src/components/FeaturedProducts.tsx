import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { CiHeart, CiShoppingCart, CiStar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import QuickView from "./QuickView";
import { FeatureProductsData } from "../constants";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setOpenQuickView } from "../redux/user/userSlice";
type SlideData = {
  img: string;
  title: string;
  stars: number;
  price: number;
  brand: string;
  productCode: string;
} | null;
interface RootState {
  user: {
    openQuickView: boolean;
    // Include other user state properties here
  };
  // Include other slices of state here
}
const FeaturedProducts = () => {
  const dispatch = useDispatch();

  const [slidesPerView, setSlidesPerView] = useState(3);
  // const [openQuickView, setOpenQuickView] = useState(false);
  const [slidesData, setSlidesData] = useState<SlideData>(null);

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

  const { openQuickView } = useSelector((state: RootState) => state.user);

  const handleQuickView = (index: number) => {
    dispatch(setOpenQuickView(true));
    const clickedSlide = FeatureProductsData[index];
    const updatedSlide = {
      ...clickedSlide,
      price: parseFloat(clickedSlide.price),
    };
    setSlidesData(updatedSlide);
  };

  return (
    <div className="max-w-[1460px] h-fit py-20 mx-auto flex flex-col gap-10  ">
      <div className="flex flex-col items-center gap-6">
        <span className="capitalize text-3xl md:text-4xl ">
          Featured Products
        </span>
        <div className="w-20 h-1 bg-black" />
      </div>

      <div
        className={`relative flex gap-2 ${
          slidesPerView < 2 && "pl-10"
        }  pl-24 items-center`}
      >
        <Swiper
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance using r
        >
          {FeatureProductsData.map((slide, index) => (
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
                      <span
                        onClick={() => handleQuickView(index)}
                        className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3"
                      >
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
      {openQuickView && (
        <QuickView
          slidesData={
            slidesData as {
              img: string;
              title: string;
              brand: string;
              productCode: string;
              price: number;
            }
          }
          setOpenQuickView={setOpenQuickView}
        />
      )}
    </div>
  );
};

export default FeaturedProducts;
