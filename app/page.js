"use client";
import MostSellItems from "./components/MostSellItems.js";
import LandingMain from "./components/LandingMain.js";
import OurService from "./components/OurService.js";
import ImageSlider from "./components/ImageSlider.js";
import { useEffect, useState } from "react";
import Modal from "./components/Modal.js";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
//   const modalOpen = sessionStorage.getItem("modalOpen") === "true";
//   if(modalOpen){
//     setIsModalOpen(false);
//   }

  useEffect(() => {
    sessionStorage.setItem("modalOpen", "true");
    // Show modal when the page is loaded or reloaded
    // setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="bg-[#EFEFEF] h-auto">
      <div className="py-6 mx-2 md:mx-28">
        <div>
          <LandingMain />
        </div>
        <div className="h-72">
          <MostSellItems />
        </div>

        <div>
          <ImageSlider />
        </div>

        <div className="h-auto">
          <OurService />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          imageSrc="/Modal/landing.jpg"
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}
