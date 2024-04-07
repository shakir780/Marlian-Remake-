import { WomenProductsData, SlideData } from "../constants";
import { useState } from "react";
import { addToCart } from "../redux/user/cartSlice";
import { addToWishlist } from "../redux/user/wishListSlice";
import WomenSubBg from "../assets/women/WomenSubBG.jpg";
import WomenBG from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";

const Women = () => {
  const [, setSlidesData] = useState<SlideData>(null);
  const [, setOpenQuickView] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickView = (index: number) => {
    setOpenQuickView(true);
    const clickedSlide = WomenProductsData[index];

    setSlidesData(clickedSlide);
  };

  return (
    <div className="pb-20">
      <ProductsSection
        title="Women's Marlians Clothing"
        description="RRelease Your African Spirit This
        Summer With Our Beautiful Range
        Of African Clothing."
        data={WomenProductsData}
        bgImage={WomenBG}
        Bgtitle="Kids"
        subBgImage={WomenSubBg}
        handleAddToCart={addToCart}
        handleAddToWishlist={addToWishlist}
        handleQuickView={(index: number) => handleQuickView(index)}
      />
    </div>
  );
};

export default Women;
