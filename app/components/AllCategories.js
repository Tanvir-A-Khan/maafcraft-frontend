"use client";
import React, { useState, useEffect } from "react";
import { getAllTypes } from "../api/api";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

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
  const [heigth, setHeight] = useState(0);

  const handleMouseEnter = async (category, index) => {
    try {
      setHeight(index * 30);
      // console.log(index * 10);
      const categoriesResponse = await getAllTypes(`${category}Type`);
      setHoveredCategory(categoriesResponse.data);
      setMainCategory(category);
      setGot(true);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategory([]);
    setGot(false);
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

  const handleCategoryClick = (categoryName) => {
    if(categoryName === undefined) categoryName = '';
    router.push(`/products/categories/${mainCategory}/${categoryName}`);
  };


  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="p-4 text-xl font-bold bg-slate-50">{"🗂️"} Categories</h1>

      <div className="relative flex" onMouseLeave={handleMouseLeave}>
        <ul className="w-56 text-sm hover:cursor-pointer">
          {categories.map((category, index) => (
            <li
              key={index}
              className=" h-[30px] flex items-center ps-3 border-2 border-transparent rounded-sm font-semibold hover:bg-gray-200 hover:text-green-700"
              onClick={() => handleCategoryClick()}
              onMouseEnter={() => handleMouseEnter(category, index)}
            >
              {"📜 "} {replaceUnderscoresWithSpaces(category)}
            </li>
          ))}
        </ul>

        {got && (
          <ul
            className={`absolute bg-white w-[300px] shadow-lg rounded hover:cursor-pointer z-40 text-sm`}
            style={{ left: "14rem", top: heigth }} // Adjust this value if needed to match your layout
          >
            <li className="p-2 mb-1 font-bold text-center bg-slate-100">
              {"🏷️"}
              {replaceUnderscoresWithSpaces(mainCategory)}
              {"🏷️"}
            </li>
            {hoveredCategory.map((item, index) => (
              <li
                key={index}
                className="h-[30px] flex items-center ps-3 border-2 border-transparent rounded-sm font-semibold hover:bg-gray-200 hover:text-green-700"
                onClick={() => handleCategoryClick(item)}
              >
                {"📜 "}
                {replaceUnderscoresWithSpaces(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllCategories;
