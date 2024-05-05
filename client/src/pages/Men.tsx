import { MensProductData } from "../constants";

import MenSubBg from "../assets/Men/MenSubBg.webp";
import MensBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";

const Men = () => {
  return (
    <div className="pb-20">
      <ProductsSection
        title="Men's Marlians Clothing"
        description="Release Your African Spirit This Summer With Our Electric Range Of African Clothing."
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={MensProductData as any}
        bgImage={MensBg}
        Bgtitle="Men"
        subBgImage={MenSubBg}
      />
    </div>
  );
};

export default Men;
