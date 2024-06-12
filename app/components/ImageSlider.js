"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import './ImageSlider.css'; // Only needed for keyframes

const ImageSlider = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="overflow-hidden w-full relative" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex 'scrolling' ${isHovered ? 'paused' : 'running'}`}>
        {images.map((image, index) => (
          <Link href={"/products/" + image.productName} key={index} className="w-56 h-auto mr-2">
            <img src={image.src} alt={`Slide ${index}`} className="w-full h-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
