import React, { useEffect, useRef, useState } from "react";
import {
  WomenProductsData,
  KidsProductsData,
  MensProductData,
} from "../constants";
import { useNavigate } from "react-router-dom";
import SearchResults from "../pages/SearchResults";

const searchData = [].concat(
  WomenProductsData,
  KidsProductsData,
  MensProductData
);

const Search = ({ setOpenSearchInput }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate(); // Get history object from react-router-dom

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm); // Set search term as user types

    // Filter search results based on search term
    const results = searchData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const navigateToSearch = () => {
    // Navigate to search component with search term as query parameter
    navigate(`/search?term=${searchTerm}`);
  };

  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpenSearchInput(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  return (
    <>
      <div className="flex justify-end px-12 fixed z-50 w-full ">
        <form
          ref={wrapperRef}
          onSubmit={(e) => {
            e.preventDefault();
            navigateToSearch();
          }}
        >
          <input
            type="text"
            className="w-[300px] px-4 h-[40px] border border-gray-600 "
            placeholder="Search  Products here"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>
    </>
  );
};

export default Search;
