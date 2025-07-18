"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/UserContext";
interface HeaderProps {
  onMenuClick?: () => void;
}


const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { userInfo } = useUser();

  
  
  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const logoutHandler = async () => {
    Cookies.remove("token");
    Cookies.remove("userInfo");
    router.refresh();
  };

  return (
    <header className="w-full bg-white border-b border-blue-100  px-2 py-1 flex items-center justify-between h-12">
      {/* Left: Hamburger on mobile, title on desktop */}
      <div className="flex items-center">
        <button
          className="md:hidden mr-2 p-1 rounded focus:outline-none hover:bg-blue-50"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <svg
            className="w-5 h-5 text-blue-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="hidden md:flex items-center text-lg font-bold text-blue-700 tracking-tight select-none">
          <FiBookOpen className="mr-2 text-blue-600" size={20} />
          NoteStash
        </span>
      </div>
      {/* Right: Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(v => !v)}
          className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-blue-50 focus:outline-none transition-colors"
        >
          <span className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center text-lg select-none">
            👤
          </span>
          <span>{userInfo?.user?.UserName}</span>
          <svg
            className="w-3 h-3 ml-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg z-10 rounded-md py-1 animate-fade-in text-sm">
            <Link
              href="/dashboard/setting"
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 text-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <FiSettings className="text-blue-500" size={15} /> Setting
            </Link>
            <button
              onClick={logoutHandler}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-600 hover:bg-blue-50"
              style={{ fontSize: "13px" }}
            >
              <FiLogOut size={15} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
