import { KidsProductsData, SlideData } from "../constants";
import { useState } from "react";
import { addToCart } from "../redux/user/cartSlice";
import { addToWishlist } from "../redux/user/wishListSlice";
import KidsSubBg from "../assets/kids/kidsubBg.jpg";
import KidsBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";

const Kids = () => {
  const [, setSlidesData] = useState<SlideData>(null);
  const [, setOpenQuickView] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickView = (index: number) => {
    setOpenQuickView(true);
    const clickedSlide = KidsProductsData[index];

    setSlidesData(clickedSlide);
  };

  return (
    <div className="pb-20">
      <ProductsSection
        title="Kid's Marlians Clothing"
        description="Let kids be kids. Let them enjoy colour and let them be comfy. You will love our kid's African clothing, nearly as much as they do!"
        data={KidsProductsData}
        bgImage={KidsBg}
        Bgtitle="Kids"
        subBgImage={KidsSubBg}
        handleAddToCart={addToCart}
        handleAddToWishlist={addToWishlist}
        handleQuickView={(index: number) => handleQuickView(index)}
      />
    </div>
  );
};

export default Kids;
