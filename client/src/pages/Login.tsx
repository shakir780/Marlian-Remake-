import { useState } from "react";
import RegisterBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import { FaHouse } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
const Login = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure((error as Error).message));
    }
  };
  return (
    <div className="">
      <div className="relative flex flex-col items-center">
        <img
          src={RegisterBg}
          style={{ filter: "brightness(40%)" }}
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute flex gap-3 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-bold text-2xl text-center">
            Login
          </span>
          <div className="flex text-white items-center gap-2">
            <span>
              <FaHouse />
            </span>
            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Account</span>
            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Login</span>
          </div>
        </div>
      </div>
      <div className="md:max-w-[900px] py-10 mx-auto">
        <div className="md:flex-row flex  gap-4 flex-col  justify-between">
          <div className="flex gap-4 flex-col border px-8 py-4 ">
            <span className="font-bold">New Customer</span>
            <span className="font-semibold">Register Account</span>
            <span>
              By creating an account you will be able to shop faster, <br /> be
              up to date on an order's status, <br /> and keep track of the
              orders you have previously made.
            </span>
            <Link
              className="text-white bg-black px-4 w-fit py-2"
              to={"/register"}
            >
              Continue
            </Link>
          </div>
          <div className="border px-8 py-4 ">
            <div>
              <span className="font-bold">Returning Customer</span>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-4 ">
                <label className="">
                  {" "}
                  <span className="text-red-600">*</span> Email Address
                </label>
                <input
                  id="email"
                  className="border border-gray-300 w-[300px]  h-[38px] rounded-lg"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-4 ">
                <label className="">
                  {" "}
                  <span className="text-red-600">*</span> Password
                </label>
                <input
                  id="password"
                  className="border border-gray-300 w-[300px]  h-[38px] rounded-lg"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <button className="text-white cursor-pointer bg-black px-6 w-fit py-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
