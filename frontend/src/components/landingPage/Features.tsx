import React from "react";
import { FaUserShield, FaUserEdit, FaStickyNote, FaTags, FaFileUpload, FaStar, FaArchive, FaThumbtack } from "react-icons/fa";
import { MdSecurity, MdOutlinePassword } from "react-icons/md";

const features = [
  {
    icon: <FaUserShield size={28} className="text-blue-600" />,
    title: "User Authentication",
    desc: "Secure sign up, login, and logout with JWT-based authentication.",
  },
  {
    icon: <MdSecurity size={28} className="text-green-600" />,
    title: "JWT Security",
    desc: "All user actions are protected with JSON Web Tokens.",
  },
  {
    icon: <FaStickyNote size={28} className="text-yellow-500" />,
    title: "Create & Manage Notes",
    desc: "Easily create, read, update, and delete your notes.",
  },
  {
    icon: <FaUserEdit size={28} className="text-purple-600" />,
    title: "Profile Management",
    desc: "Update your profile details and personalize your account.",
  },
  {
    icon: <MdOutlinePassword size={28} className="text-pink-500" />,
    title: "Change Password",
    desc: "Change your password securely anytime.",
  },
  {
    icon: <FaFileUpload size={28} className="text-indigo-500" />,
    title: "Attach Files",
    desc: "Attach files to your notes for richer content.",
  },
  {
    icon: <FaThumbtack size={28} className="text-red-500" />,
    title: "Pin Notes",
    desc: "Pin important notes to access them quickly.",
  },
  {
    icon: <FaArchive size={28} className="text-gray-600" />,
    title: "Archive Notes",
    desc: "Archive notes you want to keep but not see daily.",
  },
  {
    icon: <FaStar size={28} className="text-yellow-400" />,
    title: "Starred Notes",
    desc: "Mark notes as starred for quick reference.",
  },
  {
    icon: <FaTags size={28} className="text-blue-400" />,
    title: "Add Tags",
    desc: "Organize notes with custom tags for easy searching.",
  },
];

const Features = () => {
  return (
    <section id="features" className="w-full py-16 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Powerful Features</h2>
        <p className="text-lg text-gray-600">
          Everything you need to organize, secure, and supercharge your notes.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center rounded-2xl shadow-lg p-6 transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl border border-blue-100 bg-gradient-to-br from-blue-100/60 via-white/40 to-blue-200/60 backdrop-blur-md"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-base">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
