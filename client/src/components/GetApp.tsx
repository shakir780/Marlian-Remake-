import React from "react";
import GetAppImg from "../assets/b808ea7dedf.png";
import { FaApple } from "react-icons/fa6";
import { BiLogoPlayStore } from "react-icons/bi";
const GetApp = () => {
  return (
    <div className="h-fit bg-gray-800">
      <div className="flex md:flex-row flex-col items-center py-10 justify-around ">
        <div className="flex flex-col gap-4 items-center ">
          <span className="text-white font-bold text-2xl md:text-6xl">
            Get For Free Now!
          </span>
          <span className="text-gray-400">Available on ios and android</span>
          <div className="flex md:flex-row flex-col gap-4 py-8">
            <div className="flex gap-2 items-center bg-white hover:text-black text-green-600 hover:opacity-95 cursor-pointer px-16 py-4 rounded-full text-center  font-bold">
              <span className="text-2xl">
                <FaApple />
              </span>
              <span className="text-xl capitalize">Apple store</span>
            </div>
            <div className="flex gap-2 hover:bg-gray-200 hover:text-black cursor-pointer items-center border border-white  text-white px-16 py-4 rounded-full text-center  font-bold">
              <span className="text-2xl">
                <BiLogoPlayStore />
              </span>
              <span className="text-xl capitalize">play store</span>
            </div>
          </div>
        </div>
        <div>
          <img src={GetAppImg} className="w-[280px] py-8 object-cover" alt="" />
        </div>
      </div>
    </div>
  );
};

export default GetApp;
