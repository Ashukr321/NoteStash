"use client";
import React, { useState, useRef, useEffect } from "react";
import { TbNotebook } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { MdStars, MdHelpOutline } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
// Removed: import { useTheme } from "../common/ThemeContext";

const Navbar = () => {
  // Removed: const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar on outside click
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <nav className="w-full flex justify-center bg-gray-900 items-center transition-colors duration-300 sticky top-0 z-50 py-3 px-2">
      <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl flex items-center justify-between rounded-full shadow-lg bg-gray-950 backdrop-blur-md px-4 py-2 md:py-2 md:px-8 border border-gray-800 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-60">
          <TbNotebook size={22} color="#facc15" />
          <span className="text-lg font-bold text-white tracking-tight transition-colors duration-300">
            NoteStash
          </span>
        </div>

        {/* Right-aligned Menu (Desktop) */}
        <div className="hidden md:flex gap-6 items-center ml-auto">
          <Link
            href="#home"
            className="flex items-center gap-1.5 text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors duration-200"
          >
            <AiFillHome size={18} /> Home
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-1.5 text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors duration-200"
          >
            <MdStars size={18} /> Features
          </Link>
          <Link
            href="#fnq"
            className="flex items-center gap-1.5 text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors duration-200"
          >
            <MdHelpOutline size={18} /> FNQ
          </Link>
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 shadow-md transition-all duration-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden p-1.5 ml-2 rounded-full border border-gray-800 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <HiMenuAlt3 size={22} color="#facc15" />
        </button>

        {/* Animated Sidebar (Mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300" />
            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className="relative ml-auto w-60 max-w-[80vw] h-full bg-gray-950 shadow-lg flex flex-col p-5 animate-slideInRight transition-colors duration-300 rounded-l-2xl"
              style={{ minHeight: "100vh" }}
            >
              <button
                className="self-end mb-8 p-1.5 rounded-full border border-gray-800 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={22} color="#facc15" />
              </button>
              <Link
                href="#home"
                className="flex items-center gap-1.5 text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors duration-200 mb-6"
                onClick={() => setSidebarOpen(false)}
              >
                <AiFillHome size={18} /> Home
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-1.5 text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors duration-200 mb-6"
                onClick={() => setSidebarOpen(false)}
              >
                <MdStars size={18} /> Features
              </Link>
              <Link
                href="#fnq"
                className="flex items-center gap-1.5 text-base font-medium text-gray-200 hover:text-yellow-400 transition-colors duration-200 mb-6"
                onClick={() => setSidebarOpen(false)}
              >
                <MdHelpOutline size={18} /> FNQ
              </Link>
              <Link
                href="/login"
                className="mt-8 w-full block px-4 py-2 rounded-full font-semibold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 shadow-md transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center"
                onClick={() => setSidebarOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
        {/* Sidebar animation keyframes (Tailwind custom) */}
        <style jsx global>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          .animate-slideInRight {
            animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;
          }
        `}</style>
      </div>
    </nav>
  );
};

export default Navbar;
