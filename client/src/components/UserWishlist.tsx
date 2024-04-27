import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

interface ProductData {
  id: string;
  title: string;
  price: number;
  brand: string;
  img: string;
}
const UserWishlist = () => {
  const [userwishList, setUserWishList] = useState([]);
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  useEffect(() => {
    const fetchUserhWishList = async () => {
      try {
        if (user) {
          const response = await axios.get("/api/wishlist/get");
          setUserWishList(response.data);
        }
      } catch (error) {
        console.log("Wishlist: ", error);
      }
    };

    fetchUserhWishList();
  }, [user]);
  const addtoWishList = async (productData: ProductData) => {
    try {
      const response = await axios.post("/api/wishlist/add", {
        productId: productData.id,
        name: productData.title,
        price: productData.price,
        brand: productData.brand,
        image: productData.img,
      });

      console.log(response);

      // Optionally, you can return the response or any other data from here
      toast.success(`${response.data.message}`, {
        position: "bottom-left",
      });
      return response.data;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      // Optionally, you can throw the error or handle it in another way
      throw error;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const RemoveFromWishList = async (product: { _id: any }) => {
    try {
      const response = await axios.delete(
        `/api/wishlist/delete/${product._id}`
      );
      console.log(response); // Assuming you want to log the response data

      // If the delete request is successful, filter out the deleted product from cartProduct
      if (response.status === 200) {
        setUserWishList((prevCartProduct) =>
          prevCartProduct.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: { _id: any }) => item._id !== product._id
          )
        );
      }

      toast.success(`${response.data.message}`, {
        position: "bottom-left",
      });
    } catch (error) {
      toast.error(`Error deleting the wishlist`, {
        position: "bottom-left",
      });
    }
  };
  return { addtoWishList, userwishList, RemoveFromWishList };
};

export default UserWishlist;
