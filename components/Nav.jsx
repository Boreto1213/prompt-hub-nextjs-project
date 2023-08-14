"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const handleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };
  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <nav className="p-5 flex justify-evenly">
      <Link href="/" className="flex gap-2 flex-center items-center">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="text-orange-400 text-2xl leading-10 font-semibold h-10">
          Prompt Hub
        </p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden gap-3 text-orange-400">
        {isLoggedIn && (
          <>
            <Link
              href="/create-post"
              className="text-xl font-medium rounded-xl md:w-40 text-center leading-6 p-3 hover:bg-neutral-700 hover:text-orange-500 transition-colors duration-250 ease-in-out"
            >
              Create post
            </Link>
            <Link
              href="/profile"
              className="text-xl font-medium rounded-xl text-center  md:w-40 leading-6 p-3 hover:bg-neutral-700 hover:text-orange-500 transition-colors duration-250 ease-in-out"
            >
              Profile
            </Link>
          </>
        )}
        <button
          onClick={handleLogin}
          className="text-xl font-medium rounded-xl text-center md:w-40 p-3 hover:bg-neutral-700 hover:text-orange-500 transition-colors duration-250 ease-in-out"
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </button>
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        <FiMenu size={40} color="darkorange" onClick={handleMenu} />
        {isMenuOpen && (
          <div className="flex flex-col absolute right-0 rounded-sm top-full w-40 bg-neutral-900 text-orange-400">
            {isLoggedIn && (
              <>
                <Link
                  href="/create-post"
                  className="text-md font-medium rounded-sm text-center leading-6 p-1 m-1 bg-neutral-800"
                >
                  Create post
                </Link>
                <Link
                  href="/profile"
                  className="text-md font-medium rounded-sm text-center leading-6 p-1 m-1 bg-neutral-800"
                >
                  Profile
                </Link>
              </>
            )}
            <button
              onClick={handleLogin}
              className="text-md font-medium rounded-sm text-center leading-6 p-1 m-1 bg-neutral-800"
            >
              {isLoggedIn ? "Log out" : "Log in"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
