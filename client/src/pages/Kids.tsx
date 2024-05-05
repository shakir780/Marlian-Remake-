import { KidsProductsData } from "../constants";
import KidsSubBg from "../assets/kids/kids (2).png";
import KidsBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";

const Kids = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div className="pb-20">
      <ProductsSection
        title="Kid's Marlians Clothing"
        description="Let kids be kids. Let them enjoy colour and let them be comfy. You will love our kid's African clothing, nearly as much as they do!"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data={KidsProductsData as any}
        bgImage={KidsBg}
        Bgtitle="Kids"
        subBgImage={KidsSubBg}
      />
    </div>
  );
};

export default Kids;
