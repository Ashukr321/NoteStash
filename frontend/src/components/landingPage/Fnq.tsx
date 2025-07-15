"use client"
import React, { useState } from "react";

const faqs = [
  {
    q: "What is NoteStash?",
    a: "NoteStash is a full-stack note-taking web application built with the MERN stack. It allows users to create, organize, and manage notes securely with features like authentication, profile management, note categorization, file attachments, and more.",
  },
  {
    q: "How do I sign up and log in?",
    a: "You can sign up or log in using your email and password. All authentication is secured using JWT (JSON Web Tokens).",
  },
  {
    q: "Can I update my profile and change my password?",
    a: "Yes, you can update your profile details and securely change your password from your account settings.",
  },
  {
    q: "What note features are available?",
    a: "You can create, read, update, and delete notes. You can also pin, archive, star, and tag notes for better organization.",
  },
  {
    q: "Can I attach files to my notes?",
    a: "Absolutely! You can attach files to any note to keep all your important information in one place.",
  },
  {
    q: "How are my notes secured?",
    a: "All your data is protected with JWT authentication and secure backend APIs. Only you can access and manage your notes.",
  },
  {
    q: "Is NoteStash mobile friendly?",
    a: "Yes, NoteStash is fully responsive and works great on all devices, including smartphones and tablets.",
  },
  {
    q: "Can I organize notes with tags?",
    a: "Yes, you can add custom tags to your notes for easy searching and organization.",
  },
  {
    q: "What happens to archived notes?",
    a: "Archived notes are hidden from your main view but are safely stored and can be restored anytime.",
  },
];

const ITEMS_PER_PAGE = 4;

const Fnq = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const startIdx = page * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const pagedFaqs = faqs.slice(startIdx, endIdx);
  const totalPages = Math.ceil(faqs.length / ITEMS_PER_PAGE);

  const handleToggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="fnq" className="w-full py-16 px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600">
          Find answers to common questions about NoteStash and its features.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {pagedFaqs.map((faq, idx) => {
          const globalIdx = startIdx + idx;
          return (
            <div key={globalIdx} className="rounded-2xl bg-white/80 backdrop-blur-md shadow border border-blue-100 overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                onClick={() => handleToggle(globalIdx)}
                aria-expanded={openIdx === globalIdx}
              >
                <span className="text-lg font-semibold text-blue-700">{faq.q}</span>
                <svg
                  className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${openIdx === globalIdx ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out px-6 ${openIdx === globalIdx ? 'max-h-40 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'} overflow-hidden`}
                style={{
                  transitionProperty: 'max-height, opacity, padding',
                }}
              >
                <p className="text-gray-700 text-base leading-relaxed">{faq.a}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="px-4 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold shadow hover:bg-blue-300 transition disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold shadow hover:bg-blue-300 transition disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Fnq;
