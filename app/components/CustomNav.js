"use client"
import React from 'react';

const CustomNav = () => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between w-full py-2 bg-zinc-50 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4" data-twe-navbar-ref>
      <div className="flex flex-wrap items-center justify-between w-full px-3">
        {/* Hamburger button for mobile view */}
        <button
          className="block px-2 bg-transparent border-0 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent15"
          aria-controls="navbarSupportedContent15"
          aria-expanded="false"
          aria-label="Toggle navigation">
          {/* Hamburger icon */}
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        <div className="ms-2 md:me-2">
          <a className="text-xl text-black dark:text-white" href="#">Navbar</a>
        </div>

        {/* Collapsible navbar container */}
        <div className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto" id="navbarSupportedContent15" data-twe-collapse-item>
          {/* Left links */}
          <ul className="flex flex-col list-style-none me-auto ps-0 lg:mt-1 lg:flex-row" data-twe-navbar-nav-ref>
            {/* Home link */}
            <li className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2" data-twe-nav-item-ref>
              <a className="text-black dark:text-white lg:px-2" aria-current="page" href="#" data-twe-nav-link-ref>Home</a>
            </li>
            {/* Link */}
            <li className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
              <a className="p-0 transition duration-200 text-black/60 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2" href="#" data-twe-nav-link-ref>Link</a>
            </li>
            {/* Disabled link */}
            <li className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-link-ref>
              <a className="pointer-events-none text-black/30 dark:text-white/30 lg:px-2">Disabled</a>
            </li>
          </ul>
          <div className="w-[300px] lg:pe-2">
            <div className="relative flex flex-wrap items-stretch w-full">
              <input type="search" className="relative m-0 -me-0.5 block w-[1px] min-w-0 flex-auto rounded-s border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-1  font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-green  focus:shadow-inset focus:outline-none dark:border-white/10 dark:bg-body-dark text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill" placeholder="Search" aria-label="Search" aria-describedby="button-addon3" />
              {/* Search button */}
              <button className="relative z-[2] rounded-e border-2 border-green-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-green-600 transition duration-150 ease-in-out hover:border-green-300 hover:bg-green-50/50 hover:text-green-300 focus:border-green-600 focus:bg-green-50/50 focus:text-green-600 focus:outline-none focus:ring-0 active:border-green-700 active:text-green-700 motion-reduce:transition-none dark:text-green-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950" type="button" id="button-addon3" data-twe-ripple-init>
                Search
              </button>
            </div>
            <div>
                Login | Signup
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomNav;
