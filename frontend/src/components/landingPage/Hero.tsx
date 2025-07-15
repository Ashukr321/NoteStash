"use client";
import React from "react";
import { TbNotebook } from "react-icons/tb";

const Hero = () => {
  return (
    <section id="" className="relative w-full flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 px-2 sm:px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 overflow-hidden">
      <div className="flex flex-col items-center gap-4 max-w-xl sm:max-w-2xl mx-auto z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-gray-800 px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold text-blue-700 dark:text-yellow-300 shadow-sm mb-2 animate-fadeIn">
          <TbNotebook
            size={20}
            className="text-blue-600 dark:text-yellow-400 animate-bounce"
          />
          NoteStash
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3 sm:mb-4 animate-fadeInUp">
          Organize Your Notes
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent">
            Productively & Securely
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-5 sm:mb-6 animate-fadeInUp2">
          NoteStash is a full-stack note-taking web application that enables
          users to create, organize, and manage notes in a secure and intuitive
          environment. Built with the MERN stack, the app offers user
          authentication, profile management, note categorization (tags, pinned,
          archived), and responsive UI for productivity on the go.
        </p>
      </div>
      {/* Cool background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[90vw] sm:w-[80vw] h-40 sm:h-64 blur-2xl sm:blur-3xl opacity-30 dark:opacity-40 pointer-events-none select-none animate-blob bg-gradient-to-r from-blue-400 via-blue-200 to-blue-600 dark:from-yellow-400 dark:via-yellow-600 dark:to-yellow-800 rounded-full" />
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp2 {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp3 {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s both;
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s both;
        }
        .animate-fadeInUp2 {
          animation: fadeInUp2 1.2s both;
        }
        .animate-fadeInUp3 {
          animation: fadeInUp3 1.4s both;
        }
        @keyframes blob {
          0%,
          100% {
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          }
          25% {
            border-radius: 60% 40% 60% 40% / 50% 60% 40% 50%;
          }
          50% {
            border-radius: 40% 60% 40% 60% / 60% 50% 50% 40%;
          }
          75% {
            border-radius: 50% 50% 60% 40% / 40% 50% 60% 50%;
          }
        }
        .animate-blob {
          animation: blob 12s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Hero;
