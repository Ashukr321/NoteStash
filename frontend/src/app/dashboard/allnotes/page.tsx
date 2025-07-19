"use client";
import React, { useState } from "react";
import notesServices from "@/services/notes/notes.services";
import toast from "react-hot-toast";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { StickyNote } from "../../../components/StickyNote";

// Define NoteType for local use only
interface NoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isStarred: boolean;
  color?: string;
}

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
