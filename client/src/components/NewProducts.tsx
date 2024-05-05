// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { CiHeart, CiShoppingCart, CiStar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import QuickView from "./QuickView";
import { NewProductsData, SlideData } from "../constants";
import useUserCart from "./UserCart";
import UserWishlist from "./UserWishlist";

import { useSelector } from "react-redux";
import { useAnimation, motion, useInView } from "framer-motion";
const NewProducts = () => {
  const { addToCart } = useUserCart();
  const { addtoWishList } = UserWishlist();

  const [slidesPerView, setSlidesPerView] = useState(3);
  const [slidesData, setSlidesData] = useState<SlideData>(null);
  const [openQuickView, setOpenQuickView] = useState(false);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
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

  // const { openQuickView } = useSelector((state: RootState) => state.user);

  const handleQuickView = (index: number) => {
    // dispatch(setOpenQuickView(true));
    setOpenQuickView(true);
    const clickedSlide = NewProductsData[index];
    console.log(clickedSlide);
    setSlidesData(clickedSlide);
  };

  const handleAddtoCart = async (product) => {
    console.log(product);
    await addToCart(product);
  };
  const handleAddtoWishList = async (productData) => {
    await addtoWishList(productData);
  };

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -100 }}
      animate={controlsText}
      transition={{ duration: 1 }}
      className="max-w-[1460px] h-fit py-20 mx-auto flex flex-col gap-10  "
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={controlsText}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <span className="capitalize text-3xl md:text-4xl ">New Products</span>
        <div className="w-20 h-1 bg-black" />
      </motion.div>

      <div
        className={`relative flex gap-2 ${
          slidesPerView < 2 && "pl-9"
        }  pl-24 items-center`}
      >
        <Swiper
          slidesPerView={slidesPerView}
          pagination={{ clickable: true }}
          navigation={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance using r
        >
          {NewProductsData.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={controlsImage}
                transition={{ duration: 1 }}
                className="flex flex-col"
              >
                <div className="overflow-hidden">
                  <div className="relative overflow-hidden w-[296px] h-[368px] group">
                    <img
                      src={slide.img}
                      className="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-150 origin-right"
                      alt=""
                    />
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span
                        onClick={() => handleAddtoWishList(slide)}
                        className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3"
                      >
                        <CiHeart />
                      </span>
                      <span
                        onClick={() => handleAddtoCart(slide)}
                        className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3"
                      >
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
                  <span className="font-bold">${slide.price}</span>
                </div>
              </motion.div>
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          slidesData={slidesData}
          setOpenQuickView={setOpenQuickView}
        />
      )}
    </motion.div>
  );
};

export default NewProducts;
