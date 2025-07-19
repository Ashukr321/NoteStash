"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaPlus, FaStickyNote, FaThumbtack, FaStar, FaArchive } from "react-icons/fa";
import noteServices from "../../services/notes/notes.services.js";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const noteColors = [
    "#FFF9C4", // Light Yellow
    "#FFECB3", // Light Orange
    "#C8E6C9", // Light Green
    "#BBDEFB", // Light Blue
    "#F8BBD0", // Light Pink
  ];
  interface FormState {
    title: string;
    content: string;
    tags: string;
    color: string;
  }
  const [form, setForm] = useState<FormState>({
    title: "",
    content: "",
    tags: "",
    color: noteColors[0],
  });
  const [creating, setCreating] = useState(false);
  interface DashboardStats {
    totalNotes: number;
    totalPinned: number;
    totalStarred: number;
    totalArchived: number;
    recentlyAddedNotes: Array<{
      _id: string;
      title: string;
      content: string;
      tags: string[];
      isPinned: boolean;
      isArchived: boolean;
      isStarred: boolean;
      attachments?: unknown[];
      __v?: number;
    }>;
  }
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      const res: { success: boolean; data: DashboardStats } = await noteServices.getDashboardStats();
      if (res && res.success) {
        setStats(res.data);
      }
      setStatsLoading(false);
    };
    fetchStats();
  }, []);

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

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-2 py-6">
        <h2 className="text-2xl font-bold mb-4 text-yellow-900">Dashboard Overview</h2>
        {statsLoading ? (
          <div className="flex justify-center items-center h-32"><Loader /></div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-yellow-100 rounded-xl p-4 flex flex-col items-center shadow">
                <FaStickyNote className="text-yellow-600 mb-2" size={28} />
                <div className="text-2xl font-bold text-yellow-900">{stats.totalNotes}</div>
                <div className="text-sm text-yellow-800">Total Notes</div>
              </div>
              <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center shadow">
                <FaThumbtack className="text-blue-600 mb-2" size={28} />
                <div className="text-2xl font-bold text-blue-900">{stats.totalPinned}</div>
                <div className="text-sm text-blue-800">Pinned</div>
              </div>
              <div className="bg-orange-100 rounded-xl p-4 flex flex-col items-center shadow">
                <FaArchive className="text-orange-600 mb-2" size={28} />
                <div className="text-2xl font-bold text-orange-900">{stats.totalArchived}</div>
                <div className="text-sm text-orange-800">Archived</div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 flex flex-col items-center shadow">
                <FaStar className="text-yellow-400 mb-2" size={28} />
                <div className="text-2xl font-bold text-yellow-700">{stats.totalStarred}</div>
                <div className="text-sm text-yellow-600">Starred</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 mb-8">
              <h3 className="text-lg font-semibold mb-3 text-yellow-900">Recently Added Notes</h3>
              {stats.recentlyAddedNotes && stats.recentlyAddedNotes.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {stats.recentlyAddedNotes.map((note) => (
                    <div key={note._id} className="border-b last:border-b-0 pb-3 last:pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <div className="font-bold text-yellow-900 text-base">{note.title}</div>
                          <div className="text-gray-700 text-sm line-clamp-2 max-w-xs sm:max-w-md">{note.content}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {note.tags && note.tags.map((tag: string, i: number) => (
                              <span key={i} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                          {note.isPinned && <FaThumbtack className="text-blue-500" title="Pinned" />}
                          {note.isStarred && <FaStar className="text-yellow-400" title="Starred" />}
                          {note.isArchived && <FaArchive className="text-orange-500" title="Archived" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center">No recent notes.</div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
