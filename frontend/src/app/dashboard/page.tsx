"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaPlus } from "react-icons/fa";
import noteServices from "../../services/notes/notes.services.js";
import toast from "react-hot-toast";
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const noteColors = [
    "#FFF9C4", // Light Yellow
    "#FFECB3", // Light Orange
    "#C8E6C9", // Light Green
    "#BBDEFB", // Light Blue
    "#F8BBD0", // Light Pink
  ];
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    color: noteColors[0],
  });
  const [creating, setCreating] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleColorSelect = (color: string) => {
    setForm({ ...form, color });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setCreating(true);
      // Convert tags string to array
      const tagsArray = form.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      const resData = await noteServices.createNewNotes({
        ...form,
        tags: tagsArray,
      });
      if (resData.success) {
        setIsModalOpen(false);
        toast.success(resData.message);
        setForm({ title: "", content: "", tags: "", color: noteColors[0] });
      }
      if (!resData.success) {
        setIsModalOpen(false);
        toast.error(resData.message);
        setForm({ title: "", content: "", tags: "", color: noteColors[0] });
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsModalOpen(false);
        toast.error(error.message);
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <h1>dashboard</h1>
      {/* Floating Add Note Button */}
      <button
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-colors duration-200 z-50"
        aria-label="Add Note"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="rounded-lg shadow-2xl p-8 w-full max-w-md relative border-2"
            style={{
              background: form.color,
              borderColor: form.color,
              transform: "rotate(-2deg)",
              fontFamily:
                '"Shadows Into Light", "Comic Sans MS", cursive, sans-serif',
              boxShadow: "0 8px 24px rgba(0,0,0,0.18), 0 1.5px 0 #f6e58d inset",
            }}
          >
            <button
              className="absolute top-2 text-2xl right-2 text-gray-500 cursor-pointer hover:text-red-700"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
              style={{ fontFamily: "inherit" }}
            >
              &times;
            </button>

            <h2
              className="text-2xl font-bold mb-4 text-yellow-900"
              style={{ fontFamily: "inherit", letterSpacing: "1px" }}
            >
              Add Note
            </h2>
            {/* Color Picker */}
            <div className="flex items-center gap-3 mb-4">
              {noteColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorSelect(color)}
                  className={`w-7 h-7 rounded-full border-2 flex-shrink-0 focus:outline-none transition-all duration-150 ${
                    form.color === color
                      ? "ring-2 ring-offset-2 ring-yellow-600 border-yellow-600 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ background: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-yellow-900"
                  style={{ fontFamily: "inherit" }}
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border-none rounded px-3 py-2 bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-900 shadow-inner"
                  style={{
                    fontFamily: "inherit",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-yellow-900"
                  style={{ fontFamily: "inherit" }}
                >
                  Content
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border-none rounded px-3 py-2 bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-900 shadow-inner"
                  style={{ fontFamily: "inherit", fontSize: "1rem" }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1 text-yellow-900"
                  style={{ fontFamily: "inherit" }}
                >
                  Tags{" "}
                  <span className="text-xs text-yellow-700">
                    (optional, comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="React"
                  className="w-full border-none rounded px-3 py-2 bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-900 shadow-inner"
                  style={{ fontFamily: "inherit", fontSize: "1rem" }}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 rounded mt-2 shadow ${
                  creating ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{
                  fontFamily: "inherit",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                }}
                disabled={creating}
              >
                {creating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-yellow-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Add Note"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
