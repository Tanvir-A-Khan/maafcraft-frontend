"use client";
import MostSellItems from "./components/MostSellItems.js";
import LandingMain from "./components/LandingMain.js";
import OurService from "./components/OurService.js";
import ImageSlider from "./components/ImageSlider.js";
import { useEffect } from "react";

export default function Home() {

    function toggleLog(){
        console.log("turning off logs");
        console.log = ()=>{return};
        console.error = ()=>{return};
        console.debug = ()=>{return};
    }

    useEffect(() => {
        toggleLog();
    }, []);

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
        </main>
    );
}
