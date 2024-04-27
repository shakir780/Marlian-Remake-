import React, { useState } from "react";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SearchBg from "../assets/leon-elldot-C8Q_zR8PDlA-unsplash.jpg";
import ProductsSection from "../components/CategoriesProduct";
import { SlideData } from "../constants";
import { addToCart } from "../redux/user/cartSlice";
import { addToWishlist } from "../redux/user/wishListSlice";

const SearchResults = ({ searchResults, searchTerm }) => {
  const [, setSlidesData] = useState<SlideData>(null);
  const [, setOpenQuickView] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickView = (index: number) => {
    setOpenQuickView(true);
    const clickedSlide = searchResults[index];

    setSlidesData(clickedSlide);
  };

  console.log(searchResults?.length);
  return (
    <div className="h-fit pb-20">
      {" "}
      <div className="relative flex flex-col items-center ">
        <img
          src={SearchBg}
          style={{ filter: "brightness(40%)" }}
          alt=""
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute flex gap-3 flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-white font-bold text-2xl">Search</span>
          <div className="flex text-white items-center gap-2">
            <Link to={"/"}>
              <FaHouse />
            </Link>
            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Account</span>
            <div className="w-[1px] h-[15px] bg-gray-200" />
            <span>Search</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
        <div className="flex flex-col gap-3">
          <span className="text-5xl font-extrabold uppercase">Search</span>
          <sub>There are 18 items for Kente</sub>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
