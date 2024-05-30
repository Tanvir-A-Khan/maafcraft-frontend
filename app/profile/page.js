"use client"
import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../api/api';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    linkedIn: '',
    address: '',
  });

  const getProf = async()=>{
    // const email = extractDataFromJWT(globalState).sub;
    const res = await getUser(localStorage.getItem("email"));
    console.log(res.data);
    
    setProfile(res.data);
  }
  useEffect(()=>{
    getProf();

  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await updateUser(profile);
      console.log('Profile updated:', res.data);
      toast(res.message);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-md mb-4 mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center">Profile</h2>
      <hr/>
      <hr/>
      <hr/>
      <hr/>
      <Toaster position="top-center" reverseOrder={true} />
      <div className="mb-4">
        <label className="block text-gray-700 mt-4">Name📛</label>
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
          <p href={profile.linkedIn} className="text-gray-700 hover:underline" target="_blank">
            {profile.linkedIn}
          </p>
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
      <div className="text-center">
      <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
