import cartBG from "../assets/cartBg.webp";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
} from "../redux/user/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
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
          <span className="text-white font-bold text-2xl">Shopping Cart</span>
          <div className="flex text-white items-center gap-2">
            <Link to={"/"}>
              <FaHouse />
            </Link>

            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Shopping Cart</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 py-20 overflow-auto">
        <table className=" border-collapse border border-gray-200 w-full overflow-auto">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 text-left border border-gray-200">Image</th>
              <th className="p-3 text-left border border-gray-200">
                Product Name
              </th>
              <th className="p-3 text-left border border-gray-200">Model</th>
              <th className="p-3 text-left border border-gray-200">Quantity</th>
              <th className="p-3 text-left border border-gray-200">
                Unit Price
              </th>
              <th className="p-3 text-left border border-gray-200">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through cart items and generate table rows */}
            {cart.cartItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3  border border-gray-200">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-[120px] h-[120px] object-cover"
                  />
                </td>
                <td className="p-3  border border-gray-200">{item.title}</td>
                <td className="p-3  border border-gray-200">
                  {item.productCode}
                </td>
                <div className="flex px-3   gap-3 items-center mt-14">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleIncreaseCart(item)}
                      className="bg-gray-500 px-3 py-2 text-white"
                    >
                      +
                    </button>
                    <td className="p-3  border border-gray-200">
                      {item.cartQuantity}
                    </td>
                    <button
                      onClick={() => handleDecreaseCart(item)}
                      className="bg-gray-500 px-3 py-2 text-white"
                    >
                      -
                    </button>
                  </div>

                  <span
                    onClick={() => handleRemoveFromCart(item)}
                    className="text-lg text-white bg-red-600 px-3 py-2 cursor-pointer hover:bg-red-500"
                  >
                    <MdOutlineDeleteOutline />
                  </span>
                </div>
                <td className="p-3  border border-gray-200">${item.price}</td>
                <td className="p-3  border border-gray-200">
                  ${item.cartQuantity * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-100 border w-[250px] h-fit py-4 shadow-xl mt-8 float-right  ">
          <div className="flex flex-col px-3  ">
            <span className="self-center font-semibold opacity-90">
              {cart?.cartItems.length} items is in your bag
            </span>
            <div className="flex flex-col gap-4 px-4  mt-8 ">
              <div className="w-full h-[1px] bg-gray-400 " />
              <div className="w-full h-[1px] bg-gray-400  " />
            </div>
            <div className="flex gap-3 px-3 justify-between py-3">
              <span className="font-bold">Subtotal :</span>
              <span>${cart?.cartTotalAmount}</span>
            </div>
            <div className="flex flex-col gap-4 px-4  mt-8">
              <div className="w-full h-[1px] bg-gray-400 " />
              <div className="w-full h-[1px] bg-gray-400 " />
            </div>
            <div className="flex gap-3 px-3 justify-between py-3">
              <span className="font-bold">Total :</span>
              <span>${cart?.cartTotalAmount}</span>
            </div>
            <div className="w-full h-[1px] bg-gray-400 " />
            <div className="hover:bg-gray-500 cursor-pointer text-center text-white bg-black transition-all py-3 px-4 w-full">
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
