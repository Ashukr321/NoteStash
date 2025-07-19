"use client";
import React, { useEffect, useState } from "react";
import notesServices from "@/services/notes/notes.services";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
interface PinnedNoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  // Add other fields as needed
}

const PinnedNoteCard: React.FC<{
  note: PinnedNoteType;
  onPin: (isPinned: boolean, noteId: string) => void;
}> = ({ note, onPin }) => (
  <div className="relative flex flex-col w-full p-6 rounded-2xl border-2 mb-6 shadow transition-transform duration-300 bg-white">
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
        onClick={() => onPin(!note.isPinned, note._id)}
        aria-label={note.isPinned ? "Unpin" : "Pin"}
        title={note.isPinned ? "Unpin" : "Pin"}
        className="p-2 bg-transparent cursor-pointer"
      >
        {note.isPinned ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-yellow-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.343 21.485a1.5 1.5 0 01-2.121 0l-.707-.707a1.5 1.5 0 010-2.121L17.197 3.732z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.343 21.485a1.5 1.5 0 01-2.121 0l-.707-.707a1.5 1.5 0 010-2.121L17.197 3.732z"
            />
          </svg>
        )}
      </button>
    </div>
  </div>
);

const PinnedNotesPage = () => {
  const [notes, setNotes] = useState<PinnedNoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchNotes = async () => {
    try {
      const resData = await notesServices.getAllNotes();
      if (resData && resData.success && Array.isArray(resData.notes)) {
        setNotes(resData.notes.filter((n: PinnedNoteType) => n.isPinned));
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

  const handlePin = async (isPinned: boolean, noteId: string) => {
    try {
      const resData = await notesServices.toggleNotePinned(isPinned, noteId);

      if (resData.success) {
        setNotes(prev =>
          prev.map(note =>
            note._id === noteId ? { ...note, isPinned: isPinned } : note
          )
        );
        toast.success(resData.message);
        await fetchNotes();
      }
    } catch {}
  };

  return (
    <div className="px-2 py-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Pinned Notes</h1>
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.343 21.485a1.5 1.5 0 01-2.121 0l-.707-.707a1.5 1.5 0 010-2.121L17.197 3.732z"
            />
          </svg>
          <p className="text-lg text-gray-500 text-center">
            No pinned notes found!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 auto-rows-min">
          {notes.map(note => (
            <PinnedNoteCard key={note._id} note={note} onPin={handlePin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PinnedNotesPage;
