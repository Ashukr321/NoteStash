import notesServices from "@/services/notes/notes.services";
import toast from "react-hot-toast";

// Update handler with types and correct API usage
const handleArchive = async (isArchived: boolean, noteId: string) => {
  try {
    const resData = await notesServices.toggleNoteArchived(isArchived, noteId);
    if (resData.success) {
      toast.success(resData.message);
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

export { handleArchive, handlePin, handleStar };
