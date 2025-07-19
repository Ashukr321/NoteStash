"use client";
import React, { useEffect, useState } from "react";
import notesServices from "@/services/notes/notes.services";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

interface TrashNoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  // Add other fields as needed
}

const TrashNoteCard: React.FC<{
  note: TrashNoteType;
  onRestore: (isArchived: boolean, noteId: string) => void;
  onDelete: (noteId: string) => void;
}> = ({ note, onRestore, onDelete }) => (
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
    <div className="flex justify-end mt-2 gap-2">
      <button
        onClick={() => onRestore(false, note._id)}
        aria-label="Restore"
        title="Restore"
        className="p-2 bg-transparent cursor-pointer"
      >
        {/* Restore/Unarchive icon (arrow up from a box) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-green-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v12m0 0l-4-4m4 4l4-4M4.5 21h15a2.5 2.5 0 002.5-2.5v-7a2.5 2.5 0 00-2.5-2.5h-15A2.5 2.5 0 002 11.5v7A2.5 2.5 0 004.5 21z"
          />
        </svg>
      </button>
      <button
        onClick={() => onDelete(note._id)}
        aria-label="Delete"
        title="Delete Permanently"
        className="p-2 bg-transparent cursor-pointer"
      >
        {/* Trash/Delete icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 7.5V19a2.5 2.5 0 002.5 2.5h6A2.5 2.5 0 0017 19V7.5M4 7.5h16M9.5 11v6M14.5 11v6M10 7.5V5.75A1.75 1.75 0 0111.75 4h.5A1.75 1.75 0 0114 5.75V7.5"
          />
        </svg>
      </button>
    </div>
  </div>
);

const TrashNotesPage = () => {
  const [notes, setNotes] = useState<TrashNoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const resData = await notesServices.getAllNotes();
      if (resData && resData.success && Array.isArray(resData.notes)) {
        setNotes(resData.notes.filter((n: TrashNoteType) => n.isArchived));
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

  const handleRestore = async (isArchived: boolean, noteId: string) => {
    try {
      const resData = await notesServices.toggleNoteArchived(isArchived, noteId);
      if (resData.success) {
        setNotes(prev =>
          prev.map(note =>
            note._id === noteId ? { ...note, isArchived: isArchived } : note
          )
        );
        toast.success(resData.message);
        await fetchNotes();
      }
    } catch {}
  };

  const handleDelete = async (noteId: string) => {
    try {
      const resData = await notesServices.deleteNoteById(noteId);
      if (resData.success) {
        toast.success(resData.message);
        await fetchNotes();
      }
    } catch {}
    setShowModal(false);
    setPendingDeleteId(null);
  };

  const openDeleteModal = (noteId: string) => {
    setPendingDeleteId(noteId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPendingDeleteId(null);
  };

  return (
    <div className="px-2 py-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Trash Notes</h1>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-center">Delete Note</h2>
            <p className="mb-6 text-center">Are you sure you want to permanently delete this note? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                onClick={() => pendingDeleteId && handleDelete(pendingDeleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
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
              d="M12 3v12m0 0l-4-4m4 4l4-4M4.5 21h15a2.5 2.5 0 002.5-2.5v-7a2.5 2.5 0 00-2.5-2.5h-15A2.5 2.5 0 002 11.5v7A2.5 2.5 0 004.5 21z"
            />
          </svg>
          <p className="text-lg text-gray-500 text-center">
            No trash notes found!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 auto-rows-min">
          {notes.map(note => (
            <TrashNoteCard key={note._id} note={note} onRestore={handleRestore} onDelete={openDeleteModal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrashNotesPage;
