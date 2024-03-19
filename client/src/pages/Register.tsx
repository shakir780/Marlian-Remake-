import React from "react";
import RegisterBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import { FaHouse } from "react-icons/fa6";
const Register = () => {
  return (
    <>
      <div className="relative flex flex-col items-center">
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
      <div className="md:max-w-[900px] py-10 mx-auto ">
        <div className="flex flex-col gap-4 ">
          <span className="text-gray-400">
            If you already have an account with us, please login at the login
            page.
          </span>
          <span className="text-lg font-semibold">Your Personal Details</span>
          <hr />
        </div>
        <form className="mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> First Name
              </label>
              <input
                className="border border-gray-300 w-[300px] md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Last Name
              </label>
              <input
                className="border border-gray-300 w-[300px] md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Email
              </label>
              <input
                className="border border-gray-300 w-[300px] md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Telephone number
              </label>
              <input
                className="border border-gray-300 w-[300px] md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <span className="text-lg font-semibold">Your Password</span>
            <hr />
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span>Password
              </label>
              <input
                className="border border-gray-300 w-[300px] md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Confirm Password
              </label>
              <input
                className="border border-gray-300 w-[300px] md:w-[700px] h-[38px] rounded-lg"
                type="text"
              />
            </div>
            <span className="text-lg font-semibold">NewsLetter</span>
            <hr />
            <div className="flex gap-4 items-center justify-between">
              <label className="">
                {" "}
                <span className="text-red-600">*</span> Subscribe
              </label>
              <div className="flex items-center gap-4 ">
                <label>Yes</label>
                <input className="border border-gray-300   " type="radio" />
                <label>No</label>
                <input className="border border-gray-300   " type="radio" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
