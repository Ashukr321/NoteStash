import React from "react";
import { TbNotebook } from "react-icons/tb";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-blue-100 via-white to-blue-50 border-t border-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
        {/* Logo and App Name (Left) */}
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <TbNotebook size={24} className="text-blue-600" />
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            NoteStash
          </span>
        </div>
        {/* Social Links (Center) */}
        <div className="flex gap-5 mb-2 md:mb-0">
          <a
            href="https://www.linkedin.com/in/ashukr321/" // Replace with your LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-blue-700 hover:text-blue-900 transition-colors text-2xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/ashukr321" // Replace with your Instagram
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-pink-500 hover:text-pink-700 transition-colors text-2xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com/Ashukr321/NoteStash/" // Replace with your GitHub
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-800 hover:text-black transition-colors text-2xl"
          >
            <FaGithub />
          </a>
        </div>
        {/* Copyright (Right) */}
        <div className="text-gray-500 text-sm text-center md:text-right">
          &copy; 2025 NoteStash. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
