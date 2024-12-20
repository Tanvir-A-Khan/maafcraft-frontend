"use client";
import React, { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        linkedIn: "",
        address: "",
        organization: "",
        designation: "",
    });

    const getProf = async () => {
        const res = await getUser(localStorage.getItem("email"));
        console.log(res.data);
        setProfile(res.data);
    };

    useEffect(() => {
        getProf();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        try {
            const res = await updateUser(profile);
            toast(res.message);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="flex justify-center gap-10 ">
            <div className="w-96 mb-4  mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center">My Profile</h2>
                <hr />
                <Toaster position="top-center" reverseOrder={true} />
                <div className="mb-4">
                    <label className="block text-gray-700 mt-4">Name 📛</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                        />
                    ) : (
                        <p className="text-gray-900">{profile.name}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email 📩</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                            disabled={true}
                        />
                    ) : (
                        <p className="text-gray-900">{profile.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone ☎️</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                        />
                    ) : (
                        <p className="text-gray-900">{profile.phone}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">LinkedIn 🛜</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="linkedIn"
                            value={profile.linkedIn}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                        />
                    ) : (
                        <a
                            href={profile.linkedIn}
                            className="text-gray-700 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {profile.linkedIn}
                        </a>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address 🛐</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                        />
                    ) : (
                        <p className="text-gray-900">{profile.address}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Organization 🏢
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="organization"
                            value={profile.organization}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                        />
                    ) : (
                        <p className="text-gray-900">{profile.organization}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Designation 🎓
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="designation"
                            value={profile.designation}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-green-300"
                        />
                    ) : (
                        <p className="text-gray-900">{profile.designation}</p>
                    )}
                </div>
                <div className="text-center">
                    <button
                        onClick={
                            isEditing ? handleSave : () => setIsEditing(true)
                        }
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        {isEditing ? "Update Profile" : "Edit Profile"}
                    </button>
                </div>
            </div>
            {/* <div>
                <p className="text-xl font-semibold text-orange-500 mb-4">Order History</p>
                <hr/>
                <div className="flex gap-10 mt-2">
                    <div>
                        <Link href={"/cart/order"} className="w-10 p-2 bg-green-500 hover:bg-gray-600 text-white font-semibold cursor-pointer rounded">
                            My Orders
                        </Link>
                    </div>
                <div>
                    <Link href={"/cart"} className="p-2 bg-green-500 hover:bg-gray-600 text-white font-semibold cursor-pointer rounded">
                        My Cart
                    </Link>
                </div>
                </div>
            </div> */}
        </div>
    );
};

export default Profile;
