import { WomenProductsData } from "../constants";
import WomenSubBg from "../assets/women/WomenSubBG.jpg";
import WomenBG from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";

const Women = () => {
  return (
    <div className="pb-20">
      <ProductsSection
        title="Women's Marlians Clothing"
        description="RRelease Your African Spirit This
        Summer With Our Beautiful Range
        Of African Clothing."
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={WomenProductsData as any}
        bgImage={WomenBG}
        Bgtitle="Women"
        subBgImage={WomenSubBg}
      />
    </div>
  );
};

export default Women;
