"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { FiMenu } from "react-icons/fi";

const Nav = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="p-5 flex justify-evenly w-[100vw]">
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

      {/* width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow:
    0 0 60px 30px #fff,   inner white 
    0 0 100px 60px #f0f, middle magenta 
    0 0 140px 90px #0ff; * outer cyan */}

      {/* Desktop navigation */}
      <div className="sm:flex hidden gap-3 text-orange-400">
        {session?.user && (
          <>
            <Link
              href="/create-prompt"
              className="hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-xl font-medium rounded-xl md:w-40 text-center leading-6 p-3 hover:text-orange-500 transition duration-250 ease-in-out"
            >
              Create post
            </Link>
            
            <Link
              href="/profile"
              className="hover:shadow-[0_4px_8px_rgba(0,0,0,0.3)] text-xl font-medium rounded-xl text-center  md:w-40 leading-6 p-3 hover:text-orange-500 transition duration-250 ease-in-out"
            >
              Profile
            </Link>
          </>
        )}
        
        {session?.user && (
          <Image
            src={session?.user.image}
            width={48}
            height={48}
            className="object-contain rounded-full"
            alt="profile picture"
          />
        )}
        
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                if (session?.user) {
                  signOut();
                } else {
                  signIn(provider.id);
                }
              }}
              className="text-orange-400 hover:text-orange-500 text-xl font-medium rounded-xl text-center  md:w-40 leading-6 p-3 transition duration-250 ease-in-out"
            >
              {session?.user ? "Sign out" : "Sign in"}
            </button>
          ))}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        <FiMenu size={40} color="darkorange" onClick={handleMenu} />
        {isMenuOpen && (
          <div className="flex flex-col absolute right-0 rounded-sm top-full w-40 bg-neutral-900 text-orange-400">
            {session?.user && (
              <>
                <Link
                  href="/create-prompt"
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
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    if (session?.user) {
                      signOut();
                    } else {
                      signIn(provider.id);
                    }
                  }}
                  className="text-md font-medium rounded-sm text-center leading-6 p-1 m-1 bg-neutral-800"
                >
                  {session?.user ? "Sign out" : "Sign in"}
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
