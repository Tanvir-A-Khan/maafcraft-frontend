"use client"
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../Context/AppContext';
import { getCartItem } from '../api/api';

const page = () => {
    const { token } = useStateContext();
    const [email, setEmail] = useState(null);
    useEffect(() => {
        if(!token){
            toast("Please Log in First 🥺");
            return
        }
        getAllCartItems();
    }, []);
    
    const [cartItems, setCartItems] = useState([]);
    
    const getAllCartItems = async()=>{  

        const res = await getCartItem(token);
        console.log("fetched",  res.data);
        setCartItems(res.data)
    }
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-green-500 mb-4">Payment Successful!</h1>
            <p className="text-gray-700 mb-4">Thank you, for your purchase.</p>
            <p className="text-gray-700 mb-4">Your order is being processed.</p>
          
          </div>
        </div>
      );
}

export default page