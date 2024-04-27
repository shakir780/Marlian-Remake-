import React, { useState } from "react";
import RegisterBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import { FaHouse } from "react-icons/fa6";
import { signUpFailure, signUpSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormData {
  subscribe: boolean;
  policy: boolean;
  password?: string; // Make these optional if they might not be present initially
  confirmpassword?: string; // Make these optional if they might not be present initially
  // Add other fields as needed
}
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    subscribe: false,
    policy: false,
  });
  const dispatch = useDispatch();

  const [, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData?.password !== formData?.confirmpassword) {
      toast.error("Password must match");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }
      dispatch(signUpSuccess(data));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(signUpFailure((error as Error).message));
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center ">
        <img
          src={RegisterBg}
          style={{ filter: "brightness(40%)" }}
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute flex gap-3 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-bold text-2xl">
            Register Account
          </span>
          <div className="flex text-white items-center gap-2">
            <span>
              <FaHouse />
            </span>
            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Account</span>
            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Register</span>
          </div>
        </div>
      </div>
      <div className="md:max-w-[900px]  py-10 mx-auto  px-4 ">
        <div className="flex flex-col gap-4  ">
          <span className="text-gray-400">
            If you already have an account with us, please login at the login
            page.
          </span>
          <span className="text-lg font-semibold">Your Personal Details</span>
          <hr />
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4  md:items-center md:flex-row flex-col justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> First Name
              </label>
              <input
                onChange={handleChange}
                id="firstName"
                className=" px-3 text-gray-500 text-gray- border border-gray-30 md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <div className="flex gap-4  md:items-center md:flex-row flex-col justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Last Name
              </label>
              <input
                onChange={handleChange}
                className=" px-3 text-gray-500 text-gray- border border-gray-30 md:w-[700px] h-[38px] rounded-lg"
                type="text"
                id="lastName"
              />
            </div>
            <div className="flex gap-4  md:items-center md:flex-row flex-col justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Email
              </label>
              <input
                onChange={handleChange}
                id="email"
                className=" px-3 text-gray-500 text-gray- border border-gray-30 md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <div className="flex gap-4  md:items-center md:flex-row flex-col justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Telephone number
              </label>
              <input
                onChange={handleChange}
                id="telephone"
                className=" px-3 text-gray-500 text-gray- border border-gray-30 md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <span className="text-lg font-semibold">Your Password</span>
            <hr />
            <div className="flex gap-4  md:items-center md:flex-row flex-col justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span>Password
              </label>
              <input
                onChange={handleChange}
                id="password"
                className=" px-3 text-gray-500 text-gray- border border-gray-30 md:w-[700px] h-[38px] rounded-lg"
                type="password"
              />
            </div>
            <div className="flex gap-4  md:items-center md:flex-row flex-col justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Confirm Password
              </label>
              <input
                onChange={handleChange}
                id="confirmpassword"
                className="px-3  border border-gray-30 md:w-[700px] h-[38px] rounded-lg"
                type="password"
              />
            </div>
            <span className="text-lg font-semibold">NewsLetter</span>
            <hr />
            <div className="flex gap-4  md:items-center md:flex-row flex-col ">
              <label className="">
                <span className="text-red-600">*</span> Subscribe to our weekly
                newsletter
              </label>
              <div className="flex items-center gap-4 ">
                <input
                  id="subscribe"
                  className="border border-gray-300"
                  type="checkbox"
                  checked={formData?.subscribe}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="justify-between gap-7 flex items-center mt-7 ">
              <div className="flex gap-4">
                <span>I have read and agree to the Privacy Policy </span>
                <span>
                  <input
                    type="checkbox"
                    id="policy"
                    checked={formData?.policy}
                    onChange={handleChange}
                  />
                </span>
              </div>
              <button className="text-white bg-black px-8 w-fit py-2 cursor-pointer hover:text-gray-400">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
