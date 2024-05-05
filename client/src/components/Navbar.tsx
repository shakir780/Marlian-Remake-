// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import MobileNav from "./MobileNav";
import AccountCard from "./AccountCard";
import { NAV_LINKS } from "../constants";
import { Link } from "react-router-dom";

import CartCard from "./CartCard";
import useUserCart from "./UserCart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  console.log(cart);

  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openAccountCard, setOpenAccountCard] = useState(false);
  const [openCartCard, setOpenCartCard] = useState(false);
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const { userCart } = useUserCart();

  console.log(userCart);
  const Initials =
    user?.currentUser?.firstName?.slice(0, 1) +
    user?.currentUser?.lastName?.slice(0, 1);

  const AvatarInitials = () => (
    <div className="bg-gray-300 text-center flex justify-center items-center  rounded-full w-[40px] h-[40px] ">
      <span className="text-sm uppercase">{Initials}</span>
    </div>
  );

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
          <span
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setOpenAccountCard(!openAccountCard)}
          >
            {user.currentUser !== null ? (
              AvatarInitials()
            ) : (
              <MdOutlineManageAccounts />
            )}
          </span>
          <div className="flex gap-1 items-center">
            <span
              onClick={() => setOpenCartCard(!openCartCard)}
              className="cursor-pointer hover:text-gray-300"
            >
              <CiShoppingCart />
            </span>
            {/* <span className="text-sm">({userCart?.length})</span> */}
          </div>
        </div>
      </div>
      {openMobileNav && (
        <MobileNav
          openMobileNav={openMobileNav}
          setOpenMobileNav={setOpenMobileNav}
        />
      )}
      {openAccountCard && (
        <AccountCard setOpenAccountCard={setOpenAccountCard} />
      )}
      {openCartCard && (
        <CartCard
          openCartCard={openCartCard}
          setOpenCartCard={setOpenCartCard}
        />
      )}
      {openSearchInput && <Search setOpenSearchInput={setOpenSearchInput} />}
    </>
  );
};

export default Navbar;
