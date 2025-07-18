import React from "react";
import Link from "next/link";
import {
  MdNotes,
  MdPushPin,
  MdFavorite,
  MdLogout,
  MdDelete,
} from "react-icons/md";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <span className="mr-3 text-blue-500">
        <MdNotes size={20} />
      </span>
    ),
  },

  {
    label: "All Notes",
    href: "/dashboard/allnotes",
    icon: (
      <span className="mr-3 text-blue-500">
        <MdNotes size={20} />
      </span>
    ),
  },

  {
    label: "Pinned Notes",
    href: "/dashboard/pinnednotes",
    icon: (
      <span className="mr-3 text-purple-500">
        <MdPushPin size={20} />
      </span>
    ),
  },

  {
    label: "Favourite Notes",
    href: "/dashboard/favnotes",
    icon: (
      <span className="mr-3 text-green-500">
        <MdFavorite size={20} />
      </span>
    ),
  },

  {
    label: "Trash Notes",
    href: "/dashboard/trashnotes",
    icon: (
      <span className="mr-3 text-yellow-500">
        <MdDelete size={20} />
      </span>
    ),
  },

  {
    label: "Logout",
    href: "/logout",
    icon: (
      <span className="mr-3 text-red-500">
        <MdLogout size={20} />
      </span>
    ),
  },
];

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white border-r border-blue-100 min-h-screen py-8 px-4 flex flex-col">
      <nav className="flex-1 space-y-2">
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors"
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
