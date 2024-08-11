"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faEnvelope,
    faGlobe,
    faIndustry,
    faLocationCrosshairs,
    faMobileAlt,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
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
        toast.success(res.message);
        setData({
            name: "",
            email: "",
            phone: "",
            comment: "",
        });
    };

    return (
        <div className="mx-4 lg:mx-28">
            <Toaster position="top-center" reverseOrder={true} />
            <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2">
                {/* Contact Form */}
                <div className="p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="mb-6 text-2xl font-bold text-green-600">
                        Leave a Message
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block mb-2 text-sm font-semibold text-gray-600"
                                htmlFor="name"
                            >
                                Name*
                            </label>
                            <input
                                className="w-full px-4 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                                className="block mb-2 text-sm font-semibold text-gray-600"
                                htmlFor="email"
                            >
                                Email*
                            </label>
                            <input
                                className="w-full px-4 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                                className="block mb-2 text-sm font-semibold text-gray-600"
                                htmlFor="phone"
                            >
                                Phone Number
                            </label>
                            <input
                                className="w-full px-4 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                                className="block mb-2 text-sm font-semibold text-gray-600"
                                htmlFor="comment"
                            >
                                Comment*
                            </label>
                            <textarea
                                className="w-full px-4 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="comment"
                                placeholder="Your message..."
                                name="comment"
                                value={data.comment}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                {/* Contact Details */}
                <div className="p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="mb-6 text-2xl font-bold text-green-600">
                        Contact Details
                    </h2>
                    <div className="space-y-4">
                        <ContactDetail
                            icon={faEnvelope}
                            text="maafcraftbd@gmail.com"
                        />
                        <ContactDetail
                            icon={faEnvelope}
                            text="contact@maafcraft.com"
                        />
                        <ContactDetail
                            icon={faEnvelope}
                            text="maaf.trade@gmail.com"
                        />
                        <ContactDetail
                            icon={faGlobe}
                            text="www.maafcraft.com"
                            link="http://www.maafcraft.com"
                        />
                        {/* <ContactDetail
                            icon={faPhone}
                            text="+88 01942 257473"
                        /> */}
                        <ContactDetail
                            icon={faPhone}
                            text="+880 (02)9883301"
                        />
                        <ContactDetail
                            icon={faMobileAlt}
                            text="+88 01712 801284, +88 01727 626490, +88 01884 159814"
                        />
                        <ContactDetail
                            icon={faIndustry}
                            text="Factory: South Debipur (Ranigonj), Ghoraghat, Dinajpur, (post code- 5290), Bangladesh. কারখানাঃ দক্ষিণ দেবীপুর (রানীগন্জ), ঘোড়াঘাট, দিনাজপুর, (পোস্ট কোড- ৫২৯০), বাংলাদেশ।"
                        />
                        <ContactDetail
                            icon={faBuilding}
                            text="Corporate office: Plot #111 (8th Floor), Ranavola Avenue(Road #13), Sector #10, Uttara Model Town, Dhaka-1230, Bangladesh. কর্পোরেট অফিস: প্লট #111 (৮ম তলা), রানাভোলা এভিনিউ (রোড #১৩), সেক্টর #১০, উত্তরা মডেল টাউন, ঢাকা-১২০, বাংলাদেশ।"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactDetail = ({ icon, text, link }) => {
    return (
        <p className="flex items-center mb-3 text-gray-700">
            <FontAwesomeIcon icon={icon} className="pr-4 text-xl" />
            {link ? (
                <a
                    href={link}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {text}
                </a>
            ) : (
                text
            )}
        </p>
    );
};

export default ContactForm;
