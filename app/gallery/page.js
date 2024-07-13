"use client";
import { Gallery } from "next-gallery";
import { useEffect, useState } from "react";
import { getGalleryImages } from "../api/api";
import Spinner from "../components/Spinner";
import Link from "next/link";
import ImageSlider from "../components/ImageSlider";
import { getUrl } from "../utils/service";

// const images = [
//     { src: "/products/1.jpg", aspect_ratio: 5/3 },
//     { src: "/products/2.jpg", aspect_ratio: 4/3 },
//     { src: "/products/3.jpg", aspect_ratio: 4/3 },
//     { src: "/products/4.png", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 4/3 },
//     { src: "/products/5.jpg", aspect_ratio: 5/3 },
//     { src: "/products/6.png", aspect_ratio: 4/3 }
// ]
const widths = [500, 1000, 1600];
const ratios = [2.2, 4, 6, 8];
const className = "border-4 border-black";

export default function MyGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await getGalleryImages();
      setImages(res.data);
      console.log(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading || images == null) {
    return <Spinner />;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 mx-2 my-2 lg:mx-28 bg-slate-200 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images?.map((data, index) => (
          <Link href={"/products/" + data.id} key={index}>
            <img
              src={getUrl(data.src)}
              alt={data.productName}
              className="object-cover w-full h-auto"
            />
          </Link>
        ))}
      </div>
      
    </>
  );
}
