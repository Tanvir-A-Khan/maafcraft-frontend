"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { getAllTypes } from "../api/api";
import { replaceUnderscoresWithSpaces } from "./AllCategories";

const SearchSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getAllTypes("ProductType");
        console.log(categoriesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search triggered for:", searchQuery, "in category:", selectedCategory);
    // Add your search logic here
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-auto gap-3 lg:flex-row lg:mx-28">
      {/* Logo */}
      <img src="/slogo.png" alt="logo" width={150} />

      {/* Search bar */}
      <div className="flex justify-between h-10 border-2 border-green-600">
        <input
          type="text"
          placeholder="Search"
          className="ps-6 w-[100%] lg:w-[20rem]"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
        />

        {/* Select dropdown for categories */}
        <select
          name="language"
          id="language"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="bg-slate-200 text-black w-2/5 text-[13px] lg:block"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category} className="p-4">
              {replaceUnderscoresWithSpaces(category)}
            </option>
          ))}
        </select>

        {/* Search button */}
        <div onClick={handleSearch}>
          <FontAwesomeIcon
            icon={faSearch}
            className="p-1 px-3 text-3xl text-white transition-all bg-green-600 hover:cursor-pointer hover:bg-green-800"
          />
        </div>
      </div>

      {/* Cart section */}
      <div className="items-center justify-center hidden h-12 mb-5 lg:flex">
        <div>
          <h1 className="hidden font-semibold hover:cursor-pointer lg:block">
            CART
          </h1>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="w-10 text-back hover:cursor-pointer"
          />
        </div>
        <p className="items-center h-6 p-1 mt-5 text-xs font-semibold text-white bg-green-600 rounded-lg ms-1 hover:cursor-pointer">
          0 Items
        </p>
      </div>
    </div>
  );
};

export default SearchSection;
