import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiStar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import QuickView from "./QuickView";
import useUserCart from "./UserCart";
import { useAnimation, useInView, motion } from "framer-motion";
import UserWishlist from "./UserWishlist";

interface Product {
  quantity?: number;
  cartQuantity?: number;
  id: string;
  _id?: string;
  productId: number;
  title: string;
  price: number;
  brand: string;
  stars: string;
  img: string;
}
interface HandleAddToCart {
  (product: Product): void;
}

interface HandleAddToWishlist {
  (product: Product): void;
}

interface HandleQuickView {
  (product: Product): void;
}
interface ProductCardProps {
  product: Product;
  handleAddToCart: HandleAddToCart;
  handleAddToWishlist: HandleAddToWishlist;
  handleQuickView: HandleQuickView;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleAddToCart,
  handleAddToWishlist,
  handleQuickView,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true, // Trigger animation only once when it comes into view
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center mt-8 gap-6"
    >
      <div className="overflow-hidden">
        <div className="relative overflow-hidden w-[296px] h-[368px] group">
          <img
            src={product.img}
            className="w-full h-full object-cover transition duration-500 ease-in-out transform group-hover:scale-150 origin-right"
            alt=""
          />
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span
              onClick={() => handleAddToWishlist(product)}
              className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3"
            >
              <CiHeart />
            </span>
            <span
              onClick={() => handleAddToCart(product)}
              className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3"
            >
              <CiShoppingCart />
            </span>
            <span
              onClick={() => handleQuickView(product)}
              className="bg-white hover:bg-red-400 hover:text-white cursor-pointer  px-3 py-3"
            >
              <FaEye />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="flex gap-2  mt-3">
          {[...Array(product.stars)].map((_, i) => (
            <span key={i}>
              <CiStar />
            </span>
          ))}
        </div>
        <span className="capitalize text-sm">{product.title}</span>
        <span className="font-bold">${product.price}</span>
      </div>
    </motion.div>
  );
};

interface ProductsSectionProps {
  title: string;
  Bgtitle: string;
  description: string;
  data: Product[];
  bgImage: string;
  subBgImage: string;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  title,
  Bgtitle,
  description,
  data,
  bgImage,
  subBgImage,
}) => {
  const [openQuickView, setOpenQuickView] = useState(false);
  const [slidesData, setSlidesData] = useState<Product | null>(null);
  const { addToCart } = useUserCart();
  const { addtoWishList } = UserWishlist();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddtoCart = async (product: any) => {
    await addToCart(product);
  };

  const handleAddToWishlist = async (product: Product) => {
    await addtoWishList(product);
  };

  const handleQuickView = (product: Product) => {
    setOpenQuickView(true);
    setSlidesData(product);
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
    <>
      <div className="pb-20">
        <div className="relative flex flex-col items-center ">
          <img
            src={bgImage}
            style={{ filter: "brightness(40%)" }}
            alt=""
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute flex gap-3 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-white font-bold text-2xl">{Bgtitle}</span>
            <div className="flex text-white items-center gap-2">
              <Link to={"/"}>
                <FaHouse />
              </Link>
              <div className="w-[1px] h-[15px] bg-gray-200" />
              <span>Account</span>
              <div className="w-[1px] h-[15px] bg-gray-200" />
              <span>{Bgtitle}</span>
            </div>
          </div>
        </div>

        <div
          ref={ref}
          className="flex md:flex-row flex-col gap-2 justify-center  w-full"
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={controlsText}
            transition={{ duration: 1 }}
            className="flex flex-col w-full mt-8  justify-center gap-8 px-16"
          >
            <div className="font-extrabold text-3xl lg:text-7xl  uppercase w-full ">
              <span>{title}</span>
            </div>
            <span className="text-2xl font-semibold text-gray-500 ">
              {description}
            </span>
            <span className="text-3xl font-semibold">
              Proudly Made in Nigeria!
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={controlsImage}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <img src={subBgImage} className="w-full" />
          </motion.div>
        </div>

        <div
          className={`relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-10 items-center mt-10`}
        >
          {data.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              handleAddToCart={handleAddtoCart}
              handleAddToWishlist={handleAddToWishlist}
              handleQuickView={handleQuickView}
            />
          ))}
        </div>
      </div>
      {openQuickView && (
        <QuickView
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          slidesData={slidesData}
          setOpenQuickView={setOpenQuickView}
        />
      )}
    </>
  );
};

export default ProductsSection;
