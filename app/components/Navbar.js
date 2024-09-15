"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBarPopOver from "./NavBarPopOver";
import { useStateContext } from "../Context/AppContext";
import { extractDataFromJWT } from "../auth";

const Navbar = () => {
  const path = usePathname();
  const { globalState } = useStateContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (globalState !== null && typeof globalState !== "undefined") {
      const data = extractDataFromJWT(globalState);
      if (data) {
        setIsAdmin(data.roles.includes("ROLE_ADMIN"));
      }
    }
  }, [globalState]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clicked = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-[#444444]">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <Link href="/" className="text-2xl text-white">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <p className="font-serif text-xl font-medium text-white">
          MAAF Craft and Fashion
        </p>
        <button
          onClick={toggleMenu}
          className="text-2xl text-white focus:outline-none"
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
      <div
        className={`bg-[#444444] text-center lg:flex mx-10 lg:mx-28 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <ul className=" sticky top-0 z-20 md:flex flex-wrap justify-start lg:divide-x-2 *:text-xs lg:divide-solid lg:divide-y-2 divide-[#555555] *:px-[11px] *:py-[2px] *:text-[12px] *:uppercase *:font-light *:tracking-wide *:text-white items-center">
          <Link
            href="/"
            className="hover:bg-[#555555] hidden lg:block  duration-300 hover:cursor-pointer text-white bg-green-600"
          >
            <li>
              <FontAwesomeIcon
                icon={faHome}
                className="w-5 text-3xl text-white"
              />
            </li>
          </Link>
          <Link
            href="/products"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/products" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              All Products
            </li>
          </Link>
          <Link
            href="/about"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/about" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              About
            </li>
          </Link>
          <Link
            href="/certification"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/certification" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              Certification
            </li>
          </Link>
          <Link
            href="/license"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/license" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              Legal License
            </li>
          </Link>
          <Link
            href="/catalog"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/catalog" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              Catalog
            </li>
          </Link>
          <Link
            href="/material-info"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/material-info" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              Materials Info
            </li>
          </Link>
          <Link
            href="/gallery"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/gallery" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              Gallery
            </li>
          </Link>
          <Link
            href="/contact"
            className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
              path === "/contact" ? "bg-[#2e2e2e] text-white " : null
            }`}
          >
            <li className="p-2" onClick={() => clicked()}>
              Contact
            </li>
          </Link>
          {/* {isAdmin && (
            <Link
              href="/admin-panel"
              className={`hover:bg-[#555555] duration-300 hover:cursor-pointer h-[100%] flex items-center ${
                path === "/admin-panel" ? "bg-[#2e2e2e] text-white " : null
              }`}
            >
              <li className="p-2" onClick={() => clicked()}>
                Admin Panel
              </li>
            </Link>
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
