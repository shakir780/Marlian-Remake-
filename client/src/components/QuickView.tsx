import { CiHeart, CiStar } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

interface QuickViewProps {
  slidesData: {
    img: string;
    title: string;
    brand: string;
    productCode: string;
    price: number;
  };
  setOpenQuickView: (open: boolean) => void;
}

const QuickView: React.FC<QuickViewProps> = ({
  slidesData,
  setOpenQuickView,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white relative  w-[900px] h-[500px] p-4 rounded-lg shadow-2xl">
        <div className="absolute right-4">
          <span
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onClick={() => dispatch(setOpenQuickView(false))}
            className="text-2xl cursor-pointer"
          >
            <IoMdClose />
          </span>
        </div>

        <div className="flex gap-7  ">
          <div>
            <img
              src={slidesData?.img}
              className="object-fill w-[430px] h-[480px]"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <span className="text-xl font-semibold capitalize">
              {" "}
              {slidesData?.title}
            </span>
            <div className="flex gap-2  mt-3">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  <CiStar />
                </span>
              ))}
            </div>
            <span>Brand: {slidesData?.brand}</span>
            <span>Product Code: {slidesData?.productCode}</span>
            <span>Reward Points: 600</span>
            <span>Availability: In Stock</span>
            <div className="w-full h-[1px] bg-black" />

            <span className="mt-4 font-bold text-lg">{slidesData?.price} </span>
            <div className="mt-6 flex gap-3">
              <span className="px-4 text-white py-2 bg-black w-fit hover:bg-gray-600 cursor-pointer">
                Add to cart
              </span>
              <span className="bg-gray-500 cursor-pointer hover:bg-gray-300 px-2 py-2 w-fit text-white  self-center text-xl">
                <CiHeart />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
