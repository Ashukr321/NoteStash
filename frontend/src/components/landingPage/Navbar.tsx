"use client";
import React, { useState, useRef, useEffect } from "react";
import { TbNotebook } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { MdStars, MdHelpOutline, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import { useTheme } from "../common/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
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

  const toggleBtnBg = darkMode
    ? "bg-yellow-400 hover:bg-yellow-300 border-yellow-400"
    : "bg-blue-600 hover:bg-blue-700 border-blue-600";
  const toggleIconColor = darkMode ? "#fff" : "#fff";

  return (
    <nav className="w-full flex justify-center items-center bg-blue-50 dark:bg-gray-950 transition-colors duration-300 sticky top-0 z-50 py-3 px-2">
      <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl flex items-center justify-between rounded-full shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 py-2 md:py-2 md:px-8 border border-gray-200 dark:border-gray-800 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <TbNotebook size={22} color={darkMode ? "#facc15" : "#2563eb"} />
          <span className="text-lg font-bold text-gray-800 dark:text-white tracking-tight transition-colors duration-300">
            NoteStash
          </span>
        </div>

        {/* Centered Menu (Desktop) */}
        <div className="hidden md:flex gap-6 items-center mx-auto">
          <Link
            href="#home"
            className="flex items-center gap-1.5 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200"
          >
            <AiFillHome size={18} /> Home
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-1.5 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200"
          >
            <MdStars size={18} /> Features
          </Link>
          <Link
            href="#fnq"
            className="flex items-center gap-1.5 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200"
          >
            <MdHelpOutline size={18} /> FNQ
          </Link>
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-yellow-400 dark:to-yellow-500 dark:text-gray-900 shadow-md transition-all duration-200 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400"
          >
            Get Started
          </Link>
        </div>

        {/* Actions (Toggle) */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={toggleDarkMode}
            className={`p-1.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all duration-300 shadow-sm ${toggleBtnBg}`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <MdOutlineLightMode size={18} color={toggleIconColor} />
            ) : (
              <MdOutlineDarkMode size={18} color={toggleIconColor} />
            )}
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden p-1.5 ml-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <HiMenuAlt3 size={22} color={darkMode ? "#e5e7eb" : "#1f2937"} />
        </button>

        {/* Animated Sidebar (Mobile) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300" />
            {/* Sidebar */}
            <div
              ref={sidebarRef}
              className="relative ml-auto w-60 max-w-[80vw] h-full bg-white dark:bg-gray-900 shadow-lg flex flex-col p-5 animate-slideInRight transition-colors duration-300 rounded-l-2xl"
              style={{ minHeight: "100vh" }}
            >
              <button
                className="self-end mb-8 p-1.5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <HiX size={22} color={darkMode ? "#e5e7eb" : "#1f2937"} />
              </button>
              <Link
                href="#home"
                className="flex items-center gap-1.5 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200 mb-6"
                onClick={() => setSidebarOpen(false)}
              >
                <AiFillHome size={18} /> Home
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-1.5 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200 mb-6"
                onClick={() => setSidebarOpen(false)}
              >
                <MdStars size={18} /> Features
              </Link>
              <Link
                href="#fnq"
                className="flex items-center gap-1.5 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors duration-200 mb-6"
                onClick={() => setSidebarOpen(false)}
              >
                <MdHelpOutline size={18} /> FNQ
              </Link>
              <button
                onClick={toggleDarkMode}
                className={`p-1.5 rounded-full border mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-yellow-400 transition-all duration-300 shadow-sm ${toggleBtnBg}`}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <MdOutlineLightMode size={18} color={toggleIconColor} />
                ) : (
                  <MdOutlineDarkMode size={18} color={toggleIconColor} />
                )}
              </button>
              <Link
                href="/login"
                className="mt-8 w-full block px-4 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-yellow-400 dark:to-yellow-500 dark:text-gray-900 shadow-md transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-400 text-center"
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
