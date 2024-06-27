"use client";
import React from "react";

const InfoImage = (props) => {
  const { imageUrl, productName } = props;

  return (
    <div className=" md:w-[800px] w-auto h-[240px] ">
      <img
        src={imageUrl}
        alt={productName}
        className="object-cover w-full h-full transition-all rounded-lg hover:scale-105"
      />
    </div>
  );
};

export default InfoImage;
