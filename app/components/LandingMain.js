"use client";
import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import AllCategories from "./AllCategories";
import Spinner from "./Spinner";
import { getAllProductsOfDashboardCategory } from "../api/api";
import Link from "next/link";

const LandingMain = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // "NONE", "SLIDER", "DISCOUNT_PRODUCTS", "MOST_SELLING_ITEMS"
                // Fetching product data
                const response = await getAllProductsOfDashboardCategory(
                    "DISCOUNT_PRODUCTS"
                );
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="md:flex md:justify-between h-[80%]  bg-white border-1 border-black">
            <AllCategories className="bg-slate-100" />
            <div className=" bg-gray-200 md:w-[60%]">
                <Carousel />
            </div>

            <div className="md:w-[30%] p-2 ">
                <h1 className="font-bold mb-4 text-xl">{"🎀"}Discount Products</h1>

                {data.map((item, index) => (
                    <Link href={`/products/${item.item}`} className="flex gap-4 mb-3 mr-2 hover:cursor-pointer hover:bg-gray-200" key={index}>
                        <img
                            src={item.images}
                            alt="product"
                            className="h-[85px] w-[95px]  object-cover p-1"
                        />

                        <div className="">
                            <h1 className="font-semibold ">{item.item}</h1>
                            <p className="text-xs">Material: {item.material}</p>
                            <p className="text-xs">
                                Price: {item.pricePerPiece} $
                            </p>
                            <p className="text-xs">Rating: {item.rating}/5</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LandingMain;
