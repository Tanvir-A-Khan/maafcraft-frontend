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
        <div className="mx-28 my-10 px-4">
        <Toaster position="top  -right" reverseOrder={true} />
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        <Link href={"/cart/order"} className="border-2 bg-green-600 rounded-lg mb-4 p-2">Your orders</Link>
        {!cartItems ? (
            <p>Your cart is empty.</p>
        ) : (
            <div className="flex flex-col">
                {cartItems.length > 0 ? (
                    <>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300 text-xs">
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
                                    <tr key={item.id} className="border-b text-xl border-gray-300">
                                        <td className="py-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover mr-4"
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
                                                className="w-16 border border-gray-300 rounded py-1 px-2"
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
                        <div className="mt-6 flex flex-col items-end">
                            <p className="text-xl font-bold">
                                Total Amount:{" "}
                                <span className="text-4xl">${totalAmount}</span>
                            </p>

                                {
                                    taken && (
                                        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden mt-10 p-6">
                                        <div className="mb-4">
                                          <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Receiver Phone</label>
                                          <input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            min="1"
                                            required
                                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700"
                                          />
                                        </div>
                                        <div className="mb-4">
                                          <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">Shipping Address</label>
                                          <input
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            min="1"
                                            required
                                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700"
                                          />
                                        </div>
                                        <div className="mb-4">
                                          <label htmlFor="postcode" className="block text-gray-700 font-semibold mb-2">Post Code</label>
                                          <input
                                            type="text"
                                            id="postcode"
                                            value={postcode}
                                            onChange={(e) => setPostcode(e.target.value)}
                                            min="1"
                                            required
                                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700"
                                          />
                                        </div>
                                      </div>
                                    )
                                }

                            <button 
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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
