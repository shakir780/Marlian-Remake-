import { MensProductData, SlideData } from "../constants";
import { useState } from "react";
import { addToCart } from "../redux/user/cartSlice";
import { addToWishlist } from "../redux/user/wishListSlice";
import MenSubBg from "../assets/Men/MenSubBg.webp";
import MensBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";

const Men = () => {
  const [, setSlidesData] = useState<SlideData>(null);
  const [, setOpenQuickView] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickView = (index: number) => {
    setOpenQuickView(true);
    const clickedSlide = MensProductData[index];

    setSlidesData(clickedSlide);
  };

  return (
    <div className="pb-20">
      <ProductsSection
        title="Men's Marlians Clothing"
        description="Release Your African Spirit This Summer With Our Electric Range Of African Clothing."
        data={MensProductData}
        bgImage={MensBg}
        Bgtitle="Men"
        subBgImage={MenSubBg}
        handleAddToCart={addToCart}
        handleAddToWishlist={addToWishlist}
        handleQuickView={(index: number) => handleQuickView(index)}
      />
    </div>
  );
};

export default Men;
