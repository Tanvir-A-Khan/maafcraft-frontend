"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { getAllTypes, searchProducts } from "../api/api";
import { replaceUnderscoresWithSpaces } from "./AllCategories";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SearchSection = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await getAllTypes("ProductType");
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
        console.log(
            "Search triggered for:",
            searchQuery,
            "in category:",
            selectedCategory
        );

        // searchProducts(searchQuery, selectedCategory, 0, 10)
        // .then((res) => {console.log(res);})

        router.push(`/products/search/${searchQuery}/${selectedCategory}`);
        // Add your search logic here
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-auto gap-3 lg:flex-row lg:mx-28 px-4">
            {/* Logo */}
            <img src="/slogo.png" alt="logo" width={150} />

            {/* Search bar */}
            <div className="flex justify-between h-10 border-2 border-green-600 ">
                <input
                    type="text"
                    placeholder="Search"
                    className="ps-3 w-[100%] lg:w-[20rem]"
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
            <Link
                href="/cart"
                className="items-center justify-center hidden mb-5 lg:flex hover:cursor-pointer"
            >
                <div className="flex justify-center items-center mt-5">

                <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-3xl text-green-900 hover:text-green-700"
                    />
                </div>
                {/* <span className="items-center h-6 p-1 text-xs font-semibold text-white bg-green-600 rounded-lg ms-1 hover:cursor-pointer">
                    0
                </span> */}
            </Link>
        </div>
    );
};

export default SearchSection;
