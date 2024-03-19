import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import MobileNav from "./MobileNav";
import AccountCard from "./AccountCard";
import { NAV_LINKS } from "../constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openAccountCard, setOpenAccountCard] = useState(false);
  return (
    <>
      <div className="bg-white h-[100px] sticky top-0 z-50  shadow-xl flex items-center justify-between md:justify-around gap-10 px-8 overflow-hidden">
        <div className="flex items-center gap-2">
          <span
            onClick={() => setOpenMobileNav(!openMobileNav)}
            className="text-4xl mt-2 md:hidden inline-block"
          >
            <IoMenu />
          </span>
          <Link to={"/"} className="text-4xl">
            𝕸𝖆𝖗𝖑𝖎𝖆𝖓
          </Link>
        </div>

        <div className="md:flex hidden gap-10 items-center justify-center font-semibold ">
          {NAV_LINKS?.map((nav) => (
            <a href={nav.href} key={nav.key}>
              {nav.label}
            </a>
          ))}
        </div>
        <div className="flex gap-5 md:gap-8 text-3xl items-center">
          <span className="cursor-pointer hover:text-gray-300">
            <CiSearch />
          </span>
          <span
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setOpenAccountCard(!openAccountCard)}
          >
            <MdOutlineManageAccounts />
          </span>
          <span className="cursor-pointer hover:text-gray-300">
            <CiShoppingCart />
          </span>
        </div>
      </div>
      {openMobileNav && (
        <MobileNav
          openMobileNav={openMobileNav}
          setOpenMobileNav={setOpenMobileNav}
        />
      )}
      {openAccountCard && <AccountCard />}
    </>
  );
};

export default Navbar;
