"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faLinkedin,
    faInstagram,
    faCcMastercard,
    faCcVisa,
    faPaypal,
    faWhatsapp,
    faYoutube,
    faApplePay,
    faGooglePay,
    faAmazonPay,
} from "@fortawesome/free-brands-svg-icons";
import { faLock, faShield, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="bg-gray-100 mt-5 text-gray-700">
            <div className="container mx-auto flex flex-wrap justify-between py-12 px-4 md:px-28 gap-1">
               
                {/* Contact Info */}
                <div className="w-full md:w-1/4 mb-8 md:mb-0">
                    <h4 className="font-bold text-lg mb-2">Contact Info</h4>
                    <p>Call Us for any query</p>
                    <p className="text-2xl font-bold text-red-600">+88 01942 257473</p>
                    <p className="text-xs font-bold text-green-600">Email 1: contact@maafcraft.com</p>
                    <p className="text-xs font-bold text-green-600">Email 2: maafcraftbd@gmail.com</p>
                </div>
                 {/* Payment Methods */}
                 <div className="w-full md:w-1/4 mb-8 md:mb-0">
                    <h4 className="font-bold text-lg mb-2">Safe payments</h4>
                    <div className="flex space-x-4 text-2xl">
                        <FontAwesomeIcon icon={faCcMastercard} className="hover:text-green-700 transition-colors" />
                        <FontAwesomeIcon icon={faCcVisa} className="hover:text-green-700 transition-colors" />
                        <FontAwesomeIcon icon={faPaypal} className="hover:text-green-700 transition-colors" />
                        <FontAwesomeIcon icon={faApplePay} className="hover:text-green-700 transition-colors" />
                        <FontAwesomeIcon icon={faGooglePay} className="hover:text-green-700 transition-colors" />
                        <FontAwesomeIcon icon={faAmazonPay} className="hover:text-green-700 transition-colors" />
                    </div>
                    <p className="mt-2 text-sm">We ensure secure payment with SSL encryption and support multiple payment methods to make your shopping experience safe and easy.</p>
                </div>

               
                 {/* Company Info */}
                 <div className="w-full md:w-1/4 mb-8 md:mb-0">
                    <img src="/slogo.png" alt="logo" width={100}/>
                    <h4 className="font-bold text-lg mb-2">Location Details</h4>
                    <p className="text-xs">Factory: South Debipur (Ranigonj), Ghoraghat, Dinajpur, (post code- 5291), Bangladesh.<br />
                        {/* কারখানাঃ দক্ষিণ দেবীপুর (রানীগন্জ), ঘোড়াঘাট, দিনাজপুর, (পোস্ট কোড- ৫২৯১), বাংলাদেশ। */}
                    </p>
                    <p className="mt-2 text-xs">Corporate office: Plot #113 (8th Floor), Ranavola Avenue (Road #13), Sector #10, Uttara Model Town, Dhaka-1230, Bangladesh.<br />
                        {/* কর্পোরেট অফিস: প্লট #113 (৮ম তলা), রানাভোলা এভিনিউ (রোড #১৩), সেক্টর #১০, উত্তরা মডেল টাউন, ঢাকা-১২০, বাংলাদেশ। */}
                    </p>
                </div>


                {/* Social Media */}
                <div className="w-full md:w-1/4 mb-8 md:mb-0">
                    <h4 className="font-bold text-lg mb-2">Social Network</h4>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://twitter.com/CraftMaaf" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="hover:text-green-700 transition-colors" />
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className="hover:text-green-700 transition-colors" />
                        </a>
                        <a href="https://www.linkedin.com/posts/maaf-craft-and-fashion_maaf-craft-and-fashion-producer-of-environment-activity-7123503551984631808-5I0N/?trk=public_profile_like_view" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="hover:text-green-700 transition-colors" />
                        </a>
                        <a href="https://www.instagram.com/maafcraft?igsh=amF3ajF6NDk4aW4=" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="hover:text-green-700 transition-colors" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCxdAWOXYHyGtyTYi7iqTyWg" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} className="hover:text-green-700 transition-colors" />
                        </a>
                        <a href="https://wa.me/8801712801284" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} className="hover:text-green-700 transition-colors" />
                        </a>
                    </div>
                </div>
                
            </div>

            {/* Lower Footer */}
            <div className="bg-gray-800 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4 md:px-28">
                    <span>Copyright © 2024 Maafcraft.com - All rights reserved</span>
                    <span>@Bangladesh</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
