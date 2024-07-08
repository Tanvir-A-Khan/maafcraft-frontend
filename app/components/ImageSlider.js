// components/ImageSlider.js
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Spinner from './Spinner';
import { getGalleryImages } from '../api/api';

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
      console.log(res.data);
      setLoading(false);
    };
    getData();
   
    
  }, []);
  
  if (loading || images == null) {
    return <Spinner />;
  }
  return (
    <div className="my-2 overflow-hidden whitespace-nowrap">
      <marquee scrollamount={scroll}  onMouseEnter={()=>setScroll(0)} onMouseLeave={()=>setScroll(5)}>
      <div
        ref={sliderRef}
        className="flex items-center space-x-4 transition-transform duration-300 ease-linear"
        // style={{ overflowX: 'scroll', scrollBehavior: 'smooth' }}
        >

        {images.map((image, index) => (
          <Link href={"/products/" + image.productName} key={index} className="flex-shrink-0 transition transform hover:scale-95">
            <img
              src={image.src}
              alt={image.productName}
              className="object-cover w-64 h-64"
              style={{ aspectRatio: image.aspect_ratio }}
              />
            <p className="mt-2 text-center">{image.productName}</p>
          </Link>
        ))}
      </div>
      </marquee>
    </div>
  );
};

export default ImageSlider;
