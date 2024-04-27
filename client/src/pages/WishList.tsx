import cartBG from "../assets/cartBg.webp";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

import { MdOutlineDeleteOutline } from "react-icons/md";
import useUserCart from "../components/UserCart";
import UserWishlist from "../components/UserWishlist";

interface WishListItem {
  _id: string;

  image: string;
  price: number;
  name: string;
  productId: string;
}
const WishList = () => {
  // const wishlist = useSelector((state) => state.wishList);

  const { addToCart } = useUserCart();
  const { userwishList, RemoveFromWishList } = UserWishlist();

  const handleAddtoCart = async (product: WishListItem) => {
    console.log(product);
    await addToCart(product);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRemoveFromWishList = async (product: { _id: any }) => {
    await RemoveFromWishList(product);
  };
  console.log(userwishList);
  return (
    <div className="h-fit ">
      <div className="relative flex flex-col items-center ">
        <img
          src={cartBG}
          style={{ filter: "brightness(40%)" }}
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute flex gap-3 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-bold text-2xl">WishList</span>
          <div className="flex text-white items-center gap-2">
            <Link to={"/"}>
              <FaHouse />
            </Link>

            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>My WishList</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 py-20 w-full overflow-x-auto px-4">
        <span className="text-2xl font-bold pb-5 ">My Wish List</span>
        <table className=" border-collapse border border-gray-200 w-full mt-4  ">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-left border border-gray-200">Image</th>
              <th className="p-3 text-left border border-gray-200">
                Product Name
              </th>
              <th className="p-3 text-left border border-gray-200">Model</th>
              <th className="p-3 text-left border border-gray-200">
                Unit Price
              </th>
              <th className="p-3 text-left border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {/* Map through cart items and generate table rows */}
            {userwishList.length < 1 ? (
              // Render a message indicating zero wishlist items
              <tr>
                <td colSpan={5} className="p-3 text-center">
                  You have zero items in your wishlist.
                </td>
              </tr>
            ) : (
              // If the wishlist is not empty, map through cart items and generate table rows
              userwishList.map((item: WishListItem, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3 whitespace-nowrap border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="md:w-[120px] md:h-[120px] object-cover"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap border border-gray-200">
                    {item.name}
                  </td>
                  <td className="p-3 whitespace-nowrap border border-gray-200">
                    {item.productId}
                  </td>
                  <td className="p-3 whitespace-nowrap border border-gray-200">
                    ${item.price}
                  </td>
                  <td className="p-3 whitespace-nowrap border border-gray-200">
                    <div className="flex flex-col gap-1 justify-center items-center">
                      <span
                        onClick={() => handleAddtoCart(item)}
                        className="bg-black w-fit px-6 py-2 text-xl text-white cursor-pointer hover:opacity-80"
                      >
                        {" "}
                        <CiShoppingCart />
                      </span>
                      <span
                        onClick={() => handleRemoveFromWishList(item)}
                        className="bg-red-600 w-fit px-6 py-2 text-xl text-white cursor-pointer hover:opacity-80"
                      >
                        {" "}
                        <MdOutlineDeleteOutline />
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
