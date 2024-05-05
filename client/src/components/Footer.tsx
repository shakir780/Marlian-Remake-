import { CiFacebook, CiInstagram, CiTwitter, CiYoutube } from "react-icons/ci";
import {
  FaCcAmex,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaFax,
  FaGoogle,
  FaLocationDot,
} from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-black h-fit pb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 pt-16 px-16 gap-6  ">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-md uppercase">
              Our Address
            </span>
            <span className="w-[50px] h-[1px] bg-gray-200 opacity-75"></span>
            <span className="w-[30px] h-[1px] bg-gray-200 opacity-75"></span>
          </div>
          <div className="flex flex-col mt-6 gap-6">
            <div className="flex gap-2 items-center">
              <div className="text-white border border-white h-[30px] w-[30px] rounded-full flex items-center justify-center">
                <FaLocationDot />
              </div>
              <span className="text-white">Address: 44 New Design Street</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-white border border-white h-[30px] w-[30px] rounded-full flex items-center justify-center">
                <MdOutlineMessage />
              </div>
              <span className="text-white">info@marlian.com</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-white border border-white h-[30px] w-[30px] rounded-full flex items-center justify-center">
                <IoCallSharp />
              </div>
              <span className="text-white">+477 856 785</span>
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-white border border-white h-[30px] w-[30px] rounded-full flex items-center justify-center">
                <FaFax />
              </div>
              <span className="text-white">+0477 85X6 552</span>
            </div>
          </div>
        </div>
        <div className="md:pl-8 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-md  uppercase">
              Information
            </span>
            <span className="w-[50px] h-[1px] bg-gray-200 opacity-75"></span>
            <span className="w-[30px] h-[1px] bg-gray-200 opacity-75"></span>
          </div>
          <div className="flex flex-col gap-2 text-white">
            <span>About Us</span>
            <span>Delivery Information</span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Site Map</span>
          </div>
        </div>
        <div className="md:pl-8 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-md  uppercase">
              My Account
            </span>
            <span className="w-[50px] h-[1px] bg-gray-200 opacity-75"></span>
            <span className="w-[30px] h-[1px] bg-gray-200 opacity-75"></span>
          </div>
          <div className="flex flex-col gap-2 text-white">
            <span>My Account</span>
            <span>Order History</span>
            <span>Wish List</span>
            <span>NewsLetter</span>
            <span>Returns</span>
          </div>
        </div>
        <div className="md:pl-8 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-white font-bold text-md  uppercase">
              NewsLetter
            </span>
            <span className="w-[50px] h-[1px] bg-gray-200 opacity-75"></span>
            <span className="w-[30px] h-[1px] bg-gray-200 opacity-75"></span>
          </div>
          <div className="text-white">
            <span>
              Subscribe to our latest newsletter to get news about special
              discounts and upcoming sales
            </span>
          </div>
          <div>
            <input
              className=" w-full h-[50px] focus:outline-none px-2"
              placeholder="Enter an email address"
            />
            <div className="flex gap-3 text-white items-center justify-between py-4 text-xl">
              <span>
                <CiFacebook />
              </span>
              <span>
                <CiTwitter />
              </span>
              <span>
                <FaGoogle />
              </span>
              <span>
                <CiYoutube />
              </span>
              <span>
                <CiInstagram />
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-10  text-gray-400" />
      <div className="py-4 md:px-16 flex flex-col gap-4 md:flex-row justify-between items-center">
        <span className="text-white text-sm px-4 text-center">
          Powered By Marlian - African's Fashion Store © 2024
        </span>
        <div className="flex items-center justify-between gap-3 text-white text-2xl">
          <span>
            <FaCcVisa />
          </span>
          <span>
            <FaCcPaypal />
          </span>
          <span>
            <FaCcMastercard />
          </span>
          <span>
            <FaCcVisa />
          </span>
          <span>
            <FaCcAmex />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
