"use client";
import React, { useState } from "react";
import notesServices from "@/services/notes/notes.services";
import toast from "react-hot-toast";
import { FaArchive, FaThumbtack, FaStar, FaEye } from "react-icons/fa";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
// Extend NoteType to include color
interface NoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isStarred: boolean;
  color?: string;
  // Optionally add _id, createdAt, updatedAt if needed
}

// Define a generic NoteType for reusability
export interface StickyNoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isStarred: boolean;
  color?: string;
  // Add more fields as needed
}

export interface StickyNoteProps {
  note: StickyNoteType;
  onArchive?: () => void;
  onPin?: () => void;
  onStar?: () => void;
  onView?: () => void;
  // Optionally allow hiding/showing actions
  showArchive?: boolean;
  showPin?: boolean;
  showStar?: boolean;
  showView?: boolean;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  note,
  onArchive,
  onPin,
  onStar,
  onView,
  showArchive = true,
  showPin = true,
  showStar = true,
  showView = true,
}) => {
  return (
    <div
      className="relative flex flex-col w-full p-6 rounded-2xl border-2 mb-6 shadow bg-white"
      style={{
        fontFamily:
          '"Shadows Into Light", "Comic Sans MS", cursive, sans-serif',
        boxShadow: "0 8px 24px rgba(0,0,0,0.13), 0 1.5px 0 #f6e58d inset",
      }}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='0' y='0' width='40' height='40' fill='white' fill-opacity='0.1'/><circle cx='20' cy='20' r='2' fill='%23f6e58d'/></svg>')] rounded-2xl z-0" />
      <div className="flex-1 z-10 relative">
        <div
          className="text-lg md:text-xl font-bold text-yellow-900 break-words mb-1 tracking-wide"
          style={{ fontFamily: "inherit" }}
        >
          {note.title}
        </div>
        <div
          className="text-yellow-900 text-base md:text-lg break-words mb-2"
          style={{ fontFamily: "inherit" }}
        >
          {note.content}
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {note.tags &&
            note.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-yellow-100 text-yellow-800 text-xs md:text-sm px-2 py-0.5 rounded-full"
                style={{ fontFamily: "inherit" }}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-auto pt-2">
        {showArchive && (
          <button
            onClick={onArchive}
            aria-label="Archive"
            title="Archive"
            className="p-2 bg-transparent cursor-pointer"
            disabled={!onArchive}
          >
            {note.isArchived ? (
              <FaArchive size={18} color="#F59E42" />
            ) : (
              <FaArchive size={18} color="#808080" />
            )}
          </button>
        )}
        {showPin && (
          <button
            onClick={onPin}
            aria-label="Pin"
            title="Pin"
            className="p-2 bg-transparent"
            disabled={!onPin}
          >
            {note.isPinned ? (
              <FaThumbtack size={18} color="#F7C948" />
            ) : (
              <FaThumbtack size={18} color="#808080" />
            )}
          </button>
        )}
        {showStar && (
          <button
            onClick={onStar}
            aria-label="Star"
            title="Star"
            className="p-2 bg-transparent cursor-pointer"
            disabled={!onStar}
          >
            {note.isStarred ? (
              <FaStar size={18} color="#FFD700" />
            ) : (
              <FaStar size={18} color="#808080" />
            )}
          </button>
        )}
        {showView && (
          <button
            onClick={onView}
            aria-label="View Details"
            title="View Details"
            className="p-2 bg-transparent cursor-pointer"
            disabled={!onView}
          >
            <FaEye size={18} color="#4F8EF7" className="cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
};

const AllNotesPage = () => {
  const router = useRouter();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Initial fetch with loading spinner
  const fetchNotes = React.useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const resData = await notesServices.getAllNotes();
      if (resData && resData.success && Array.isArray(resData.notes)) {
        setNotes(resData.notes);
      } else {
        toast.error(resData?.message || "Failed to fetch notes");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message || "Error fetching notes");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchNotes(true); // show loading spinner only on first load
  }, [fetchNotes]);

  // Handlers
  const handleArchive = async (isArchived: boolean, noteId: string) => {
    try {
      const resData = await notesServices.toggleNoteArchived(
        isArchived,
        noteId
      );
      if (resData.success) {
        toast.success(resData.message);
        await fetchNotes(false); // background refresh
      }
      if (!resData.success) {
        toast.error(resData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handlePin = async (isPinned: boolean, noteId: string) => {
    try {
      const resData = await notesServices.toggleNotePinned(isPinned, noteId);
      if (resData.success) {
        toast.success(resData.message);
        await fetchNotes(false); // background refresh
      }
      if (!resData.success) {
        toast.error(resData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleStar = async (isStarred: boolean, noteId: string) => {
    try {
      const resData = await notesServices.toggleNoteStarred(isStarred, noteId);
      if (resData.success) {
        toast.success(resData.message);
        await fetchNotes(false); // background refresh
      }
      if (!resData.success) {
        toast.error(resData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleView = (noteId:string) => {
    router.push(`/dashboard/allnotes/${noteId}`);
  };

  return (
    <div className="px-2 py-4  max-w-7xl mx-auto">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 auto-rows-min">
          {notes.map(note => (
            <StickyNote
              key={note._id}
              note={note}
              onArchive={() => handleArchive(!note.isArchived, note._id)}
              onPin={() => handlePin(!note.isPinned, note._id)}
              onStar={() => handleStar(!note.isStarred, note._id)}
              onView={() => handleView(note._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNotesPage;
