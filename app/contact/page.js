"use client";
import {
    faBuilding,
    faEnvelope,
    faGlobe,
    faIndustry,
    faLocationCrosshairs,
    faMobileAlt,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { addFeedBack } from "../api/api";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addFeedBack({
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.comment,
        });
        console.log(res);
        setData({
            name: "",
            email: "",
            phone: "",
            comment: "",
        });
        toast(res.message);
    };

    return (
        <div className="lg:mx-28 mx-4">
            <div className="container flex flex-wrap flex-col lg:flex-row items-start mt-4 justify-center space-y-4 lg:space-y-0 lg:space-x-4">
                <Toaster position="top-center" reverseOrder={true} />
                <div className="w-full lg:w-[45%] bg-white p-6 shadow-lg rounded-xl">
                    <h2 className="text-2xl mb-6 font-bold text-green-600">
                        Leave a Message
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-600 text-sm font-semibold mb-2"
                                htmlFor="name"
                            >
                                Name*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-600 text-sm font-semibold mb-2"
                                htmlFor="email"
                            >
                                Email*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Your Email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-600 text-sm font-semibold mb-2"
                                htmlFor="phone"
                            >
                                Number Phone*
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                type="tel"
                                placeholder="Your Phone Number"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-600 text-sm font-semibold mb-2"
                                htmlFor="comment"
                            >
                                Comment*
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="comment"
                                placeholder="Your message..."
                                name="comment"
                                value={data.comment}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div className="w-full lg:w-[45%] bg-white p-6 shadow-lg rounded-xl ">
                    <h2 className="text-2xl mb-6 font-bold text-green-600">
                        Contact Detail
                    </h2>
                    <div className="mb-4 w-full">
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-xl pr-4"
                            />
                            maafcraftbd@gmail.com
                        </p>
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-xl pr-4"
                            />
                            contact@maafcraft.com
                        </p>
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="text-xl pr-4"
                            />
                            maaf.trade@gmail.com
                        </p>
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faGlobe}
                                className="text-xl pr-4"
                            />
                            <a href="http://www.maafcraft.com" className="hover:underline">
                                www.maafcraft.com
                            </a>
                        </p>
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="text-xl pr-4"
                            />
                            +88 01942 257473
                        </p>
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="text-xl pr-4"
                            />
                            +880 (02)9883301
                        </p>
                        <p className="flex items-center text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faMobileAlt}
                                className="text-xl pr-4"
                            />
                            +8801712801284, +8801727626490, +8801884159814
                        </p>
                        <p className="flex items-start text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faIndustry}
                                className="text-xl pr-4"
                            />
                            <span className="text-justify">
                                Factory: South Debipur (Ranigonj), Ghoraghat, Dinajpur, (post code- 5291), Bangladesh.<br />
                                কারখানাঃ দক্ষিণ দেবীপুর (রানীগন্জ), ঘোড়াঘাট, দিনাজপুর, (পোস্ট কোড- ৫২৯১), বাংলাদেশ।
                            </span>
                        </p>
                        <p className="flex items-start text-gray-700 mb-3">
                            <FontAwesomeIcon
                                icon={faBuilding}
                                className="text-xl pr-4 "
                            />
                            <span className="text-justify">
                                Corporate office: Plot #113 (8th Floor), Ranavola Avenue(Road #13), Sector #10, Uttara Model Town, Dhaka-1230, Bangladesh.<br />
                                কর্পোরেট অফিস: প্লট #113 (৮ম তলা), রানাভোলা এভিনিউ (রোড #১৩), সেক্টর #১০, উত্তরা মডেল টাউন, ঢাকা-১২০, বাংলাদেশ।
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
