import React from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineSearch, AiOutlinePlus, AiOutlineSwap } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const BottomNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-green-600 transition-colors">
            <AiOutlineHome size={24} />
            <span className="text-xs">Home</span>
        </Link>
        <Link href="/search" className="flex flex-col items-center text-gray-700 hover:text-green-600 transition-colors">
            <AiOutlineSearch size={24} />
            <span className="text-xs">Search</span>
        </Link>
        <Link href="/add" className="flex flex-col items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg -mt-8 hover:bg-green-600 transition-colors">
            <AiOutlinePlus size={24} />
        </Link>
        <Link href="/discover" className="flex flex-col items-center text-gray-700 hover:text-green-600 transition-colors">
            <AiOutlineSwap size={24} />
            <span className="text-xs">Swipe</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-700 hover:text-green-600 transition-colors">
            <CgProfile size={24} />
            <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavbar; 