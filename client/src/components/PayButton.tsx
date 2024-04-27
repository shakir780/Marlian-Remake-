import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const handleCheckout = async () => {
    axios
      .post(`api/stripe/create-checkout-session`, {
        cartItems,
        userId: user.currentUser._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
