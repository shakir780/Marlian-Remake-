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
  const [error, setError] = useState(undefined);
  const user = useSelector((state: RootState) => state.user);
  console.log(user);
  console.log(userwishList);
  useEffect(() => {
    const fetchUserhWishList = async () => {
      try {
        if (user?.currentUser !== null) {
          const response = await axios.get("/api/wishlist/get");
          setUserWishList(response.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
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

      if (response.data.success && user?.currentUser !== null) {
        toast.success(`${response.data.message}`, {
          position: "bottom-left",
        });
        return response.data;
      } else {
        if (user?.currentUser === null) {
          {
            toast.error("Please Log In or Register to add to Wishlist", {
              position: "bottom-left",
            });
          }
        } else {
          toast.error("Failed to add product to Wishlist", {
            position: "bottom-left",
          });
        }
      }

      // Optionally, you can return the response or any other data from here
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: "bottom-left",
      });
      // Optionally, you can throw the error or handle it in another way
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
  return { addtoWishList, userwishList, RemoveFromWishList, error };
};

export default UserWishlist;
