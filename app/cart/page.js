"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useStateContext } from "../Context/AppContext";
import { getCartItem, makeOrder, makePayment, removeACart, updateQuantity } from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { extractDataFromJWT } from "../auth";

const CartPage = () => {

    const { token } = useStateContext();
    const [email, setEmail] = useState("");
    const [taken, setTaken] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [postcode, setPostcode] = useState("");
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
   

    // Mock data for cart items

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < Number(data.moq)) {
            toast.error("Quantity cannot be less than " + data.moq);
            return;
        }
        updateQuantity(itemId, newQuantity).then((res)=>{
            console.log("res",res);
            toast(res.message);
        })
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleRemoveItem = async(itemId) => {
        const res = await removeACart(itemId)
        console.log(res);
        toast(res.message);
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const totalAmount = cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleCheckout = async()=>{

        if(taken==false){
            setTaken(true);
            return;
        }

        if(phone=="" || address == "" || postcode== ""){
            toast("All fields must be filled");
            return;
        }

        const data = {
            address: address,
            email: token,
            phone: phone,
            postCode: postcode,
            cartList: cartItems,
            totalAmount
        };

        const res = await makeOrder(data);
        // console.log(data);
        // console.log(totalAmount);
        if(res.result){
            location.reload();
        }

        toast("getting it")
    }

    return (
        <div className="px-4 my-10 mx-28">
        <Toaster position="top  -right" reverseOrder={true} />
        <h2 className="mb-6 text-3xl font-bold">Shopping Cart</h2>
        <Link href={"/cart/order"} className="p-2 mb-4 bg-green-600 border-2 rounded-lg">Your orders</Link>
        {!cartItems ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="flex flex-col">
                {cartItems.length > 0 ? (
                    <>
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs border-b border-gray-300">
                                    <th className="py-2 text-start">Image</th>
                                    <th className="py-2 text-start">Name</th>
                                    <th className="py-2 text-start">Weight</th>
                                    <th className="py-2 text-start">Total Cartoon</th>
                                    <th className="py-2 text-start">Total CBM</th>
                                    <th className="py-2 text-start">Price</th>
                                    <th className="py-2 text-start">Quantity</th>
                                    <th className="py-2 text-start"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id} className="text-xl border-b border-gray-300">
                                        <td className="py-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover w-20 h-20 mr-4"
                                            />
                                        </td>
                                        <td className="py-2">{item.productName}</td>
                                        <td className="py-2">{item.weight * item.quantity} gm</td>
                                        <td className="py-2">{item.quantity}</td>
                                        <td className="py-2">{item.cbm * item.quantity} cm<sup>3</sup></td>
                                        <td className="py-2">{item.price}Taka</td>
                                        <td className="py-2">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                min="1"
                                                className="w-16 px-2 py-1 border border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="py-2">
                                            <button
                                                className="text-red-500"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex flex-col items-end mt-6">
                            <p className="text-xl font-bold">
                                Total Amount:{" "}
                                <span className="text-4xl">${totalAmount}</span>
                            </p>

                                {
                                    taken && (
                                        <div className="max-w-md p-6 mt-10 overflow-hidden bg-white rounded-lg shadow-lg">
                                        <div className="mb-4">
                                          <label htmlFor="phone" className="block mb-2 font-semibold text-gray-700">Receiver Phone</label>
                                          <input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            min="1"
                                            required
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                                          />
                                        </div>
                                        <div className="mb-4">
                                          <label htmlFor="address" className="block mb-2 font-semibold text-gray-700">Shipping Address</label>
                                          <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            min="1"
                                            required
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                                          />
                                        </div>
                                        <div className="mb-4">
                                          <label htmlFor="postcode" className="block mb-2 font-semibold text-gray-700">Post Code</label>
                                          <input
                                            type="text"
                                            id="postcode"
                                            value={postcode}
                                            onChange={(e) => setPostcode(e.target.value)}
                                            min="1"
                                            required
                                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded"
                                          />
                                        </div>
                                      </div>
                                    )
                                }

                            <button 
                                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
        )}
    </div>
    
    );
};

export default CartPage;
