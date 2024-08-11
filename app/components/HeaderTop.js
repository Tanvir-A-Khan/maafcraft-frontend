"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSearch } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";
import { useStateContext } from "../Context/AppContext";
import { extractDataFromJWT } from "../auth";
import SearchSection from "./SearchSection";

export const Context = React.createContext();

const HeaderTop = () => {
    const { globalState, setGlobalState } = useStateContext();

    const [islogged, setIslogged] = useState(globalState);

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if ((globalState !== null) & (typeof globalState !== undefined)) {
            const data = extractDataFromJWT(globalState);
            if (data) {
                setIsAdmin(data.roles.includes("ROLE_ADMIN"));
                setIslogged(data.roles.includes("ROLE_USER"));
            }
        }
    }, [globalState]);
    const router = useRouter();
    const handleProfile = () => {
        router.push("/profile");
    };
    
    const handleRoute = (route) => {
        router.push(`/${route}`);

    }

    const handleLogout = () => {    
        setGlobalState(null);
        localStorage.removeItem("auth");
        localStorage.clear();
        // location.href = "http://localhost:3000";
        router.push("/");
    };

    const [items, setItems] = useState([{ id: 0, name: "Searching...." }]);
    return (
        <div className="">
            <div className="sticky top-0 z-20 md:flex justify-between h-auto md:px-28 bg-[#EFEFEF]">
                {/* <div >
                    <img src="/slogo.png" alt="logo"  width={150} />
                </div> */}
                <div className="flex-col items-center justify-center hidden gap-2 text-xs text-red-600 lg:flex">
                    <div>
                        <FontAwesomeIcon icon={faPhone} className="w-5" />
                        Hotline: +88 01712 801284
                    </div>
                  
                </div>
                    <p className="flex items-center justify-center h-auto text-xl font-semibold text-green-600 md:text-3xl">
                        MAAF Craft and Fashion
                    </p> 
                <div className="flex items-center justify-center h-auto gap-3 ">
                    {globalState ? (
                        <div className="flex justify-around w-72 py-1 text-xs text-slate-600">
                            <button onClick={()=>handleRoute("cart")} className="hover:font-bold">My Cart</button>
                            <span> | </span> 
                            <button onClick={()=>handleRoute("cart/order")} className="hover:font-bold">My Orders</button>
                            <span> | </span> 
                            <button onClick={handleProfile} className="hover:font-bold">Profile</button>
                            <span> | </span> 
                            <button onClick={handleLogout} className="hover:font-bold" >Logout</button>
                        </div>
                    ) : (
                        <Link href={"/registration"} className="text-xs hover:font-bold">Signup</Link>
                    )}
                </div>
            </div>
            <SearchSection/>
            <div className="font-semibold text-green-800 w-full md:w-auto py-2 px-2 md:px-28">
                <Marquee>
                    Maafcraft offers quality products, competitive prices, and
                    on-time delivery. 
                </Marquee>
            </div>
            
        </div>
    );
};

export default HeaderTop;
