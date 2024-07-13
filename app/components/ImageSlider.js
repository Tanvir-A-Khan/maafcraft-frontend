// components/ImageSlider.js
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Spinner from "./Spinner";
import { getGalleryImages } from "../api/api";
import { getUrl } from "../utils/service";

const ImageSlider = () => {
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(5);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const res = await getGalleryImages();
            setImages(res.data);
            console.log('hisi sisisi ' , res.data);
            setLoading(false);
        };
        getData();
        const startSlider = () => {
            intervalRef.current = setInterval(() => {
                if (sliderRef.current) {
                    const maxScrollLeft =
                        sliderRef.current.scrollWidth -
                        sliderRef.current.clientWidth;
                    if (sliderRef.current.scrollLeft >= maxScrollLeft) {
                        sliderRef.current.scrollLeft = 0;
                    } else {
                        sliderRef.current.scrollLeft += 1; // Adjust this value to control the speed
                    }
                }
            }, 10); // Adjust the interval time to control the speed
        };

        startSlider();

        // const slider = sliderRef.current;
        // slider.addEventListener('mouseenter', () => clearInterval(intervalRef.current));
        // slider.addEventListener('mouseleave', startSlider);

        // return () => {
        //   clearInterval(intervalRef.current);
        //   slider.removeEventListener('mouseenter', () => clearInterval(intervalRef.current));
        //   slider.removeEventListener('mouseleave', startSlider);
        // };
    }, []);

    if (loading || images == null) {
        return <Spinner />;
    }
    return (
        <div className="my-2 overflow-hidden whitespace-nowrap">
            <marquee>
                <div
                    ref={sliderRef}
                    className="flex items-center space-x-4 transition-transform duration-300 ease-linear"
                    // style={{ overflowX: 'scroll', scrollBehavior: 'smooth' }}
                >
                    {images.map((image, index) => (
                        <Link
                            href={"/products/" + image.id}
                            key={index}
                            className="flex-shrink-0 transition transform hover:scale-95"
                        >
                            <img
                                src={getUrl(image.src)}
                                alt={image.productName}
                                className="object-cover w-64 h-64"
                                style={{ aspectRatio: image.aspect_ratio }}
                            />
                            <p className="mt-2 text-center">
                                {image.productName}
                            </p>
                        </Link>
                    ))}
                </div>
            </marquee>
        </div>
    );
};

export default ImageSlider;
