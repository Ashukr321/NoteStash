"use client";
import React, { useEffect, useState } from "react";
import notesServices from "@/services/notes/notes.services";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

interface FavNoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isStarred: boolean;
  // Add other fields as needed
}

const FavNoteCard: React.FC<{
  note: FavNoteType;
  onStar: (isStarred: boolean, noteId: string) => void;
}> = ({ note, onStar }) => (
  <div className="relative flex flex-col w-full p-6 rounded-2xl border-2 mb-6 shadow bg-white">
    <div className="flex-1">
      <div className="text-lg font-bold text-yellow-900 mb-1">{note.title}</div>
      <div className="text-yellow-900 text-base mb-2">{note.content}</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {note.tags &&
          note.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
    <div className="flex justify-end mt-2">
      <button
        onClick={() => onStar(!note.isStarred, note._id)}
        aria-label={note.isStarred ? "Unstar" : "Star"}
        title={note.isStarred ? "Unstar" : "Star"}
        className="p-2 bg-transparent cursor-pointer"
      >
        {note.isStarred ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-yellow-400"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
        )}
      </button>
    </div>
  </div>
);

const FavNotesPage = () => {
  const [notes, setNotes] = useState<FavNoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchNotes = async () => {
    try {
      const resData = await notesServices.getAllNotes();
      if (resData && resData.success && Array.isArray(resData.notes)) {
        setNotes(resData.notes.filter((n: FavNoteType) => n.isStarred));
      } else {
        setNotes([]);
      }
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleStar = async (isStarred: boolean, noteId: string) => {
    try {
      const resData = await notesServices.toggleNoteStarred(isStarred, noteId);
      if (resData.success) {
        setNotes(prev =>
          prev.map(note =>
            note._id === noteId ? { ...note, isStarred: isStarred } : note
          )
        );
        toast.success(resData.message);
        await fetchNotes();
      }
    } catch {}
  };

  return (
    <div className="px-2 py-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Favorite Notes</h1>
      {loading ? (
        <div className="h-40 flex justify-center items-center">
          <Loader />
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col h-96 items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
          <p className="text-lg text-gray-500 text-center">
            No favorite notes found!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 auto-rows-min">
          {notes.map(note => (
            <FavNoteCard key={note._id} note={note} onStar={handleStar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavNotesPage;
