"use client";
import React, { useState, useEffect } from "react";
import { getAllTypes } from "../api/api";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export function replaceUnderscoresWithSpaces(inputString) {
  return inputString.replace(/_/g, " ");
}

const AllCategories = () => {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [got, setGot] = useState(false);
  const [height, setHeight] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null); // Track active category

  const handleCategoryClick = async (category, index) => {
    try {
      if (activeCategoryIndex === index) {
        // If the category is already active, toggle it off
        setHoveredCategory([]);
        setGot(false);
        setActiveCategoryIndex(null);
      } else {
        const categoriesResponse = await getAllTypes(`${category}Type`);
        setHoveredCategory(categoriesResponse.data);
        setMainCategory(category);
        setGot(true);
        setHeight(index * 30); // Adjust the height for mobile as well
        setActiveCategoryIndex(index); // Set the active category
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await getAllTypes("ProductType");
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubCategoryClick = (categoryName) => {
    if (categoryName === undefined) categoryName = "";
    router.push(`/products/categories/${mainCategory}/${categoryName}`);
  };
  const handleMainCategoryClick = (categoryName) => {
    if (categoryName === undefined) categoryName = "";
    router.push(`/products/categories/${categoryName}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-4 text-xl md:w-56 w-full font-bold bg-slate-50">
        <p>{"🗂️"} Categories</p>
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-black focus:outline-none"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="relative flex flex-col">
          <ul className="w-56 text-sm hover:cursor-pointer">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`h-[30px] flex items-center ps-3 border-2 border-transparent rounded-sm font-semibold hover:bg-gray-200 hover:text-green-700 ${
                  activeCategoryIndex === index ? "bg-gray-200 text-green-700" : ""
                }`}
                onClick={() => handleCategoryClick(category, index)} // Handle click instead of hover
              >
                {"📜 "} {replaceUnderscoresWithSpaces(category)}
              </li>
            ))}
          </ul>

          {got && (
            <ul
              className={`absolute bg-white ms-36 md:ms-56 w-[250px] shadow-lg rounded hover:cursor-pointer z-40 text-sm md:block ${
                activeCategoryIndex !== null ? "block" : "hidden"
              }`}
              style={{ top: height }} // Adjust top position
            >
              <li className="p-2 mb-1 font-bold text-center bg-slate-100" onClick={()=>handleMainCategoryClick(mainCategory)}>
                {"🏷️"} {replaceUnderscoresWithSpaces(mainCategory)} {"🏷️"}
              </li>
              {hoveredCategory.map((item, index) => (
                <li
                  key={index}
                  className="h-[30px] flex items-center ps-3 border-2 border-transparent rounded-sm font-semibold hover:bg-gray-200 hover:text-green-700"
                  onClick={() => handleSubCategoryClick(item)}
                >
                  {"📜 "} {replaceUnderscoresWithSpaces(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
