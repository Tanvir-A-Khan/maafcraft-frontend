"use client";
import "react-slideshow-image/dist/styles.css";

import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import Spinner from "./Spinner";
import { getAllProductsOfDashboardCategory } from "../api/api";
import Link from "next/link";

const Carousel = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching product data
                const response = await getAllProductsOfDashboardCategory("SLIDER");
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
        <div className="slide-container">
            <Slide autoplay={true}>
                {data.map((item, index) => (
                    <Link href={`/products/${item.item}`} key={index}>
                        <div
                            className="each-slide"
                            style={{
                                backgroundImage: `url(${item.images})`,
                                backgroundSize: "cover", // Set the background size to cover
                                backgroundPosition: "center", // Center the background image
                                backgroundRepeat: "no-repeat",
                                height: "600px", // Set the height
                                
                            }}
                        >
                            <div className="slide-content">
                                <div className="text-overlay">
                                    <p className="text-3xl font-semibold">{item.item}</p>
                                    <p className="text-xs">
                                        Materials: {item.material} {" | "} Price: {item.pricePerPiece} {"$"}
                                    </p>
                                    <p className="text-xs">Model: {item.model}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slide>
        </div>
    );
};

export default Carousel;
