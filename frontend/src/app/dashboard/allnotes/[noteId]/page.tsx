"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import notesServices from "@/services/notes/notes.services";
import Loader from "@/components/common/Loader";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NoteType {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  isArchived: boolean;
  isStarred: boolean;
}

const NoteDetailsPage = () => {
  const params = useParams() as { noteId: string };
  const noteId = params.noteId;
  const router = useRouter();

  const [note, setNote] = useState<NoteType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
    isPinned: false,
    isArchived: false,
    isStarred: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const res = await notesServices.getNoteById(noteId);
      if (res && res.success && res.note) {
        setNote(res.note);
        setForm({
          title: res.note.title,
          content: res.note.content,
          tags: res.note.tags ? res.note.tags.join(", ") : "",
          isPinned: res.note.isPinned,
          isArchived: res.note.isArchived,
          isStarred: res.note.isStarred,
        });
      } else {
        setNote(null);
      }
      setLoading(false);
    };
    if (noteId) fetchNote();
  }, [noteId]);

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-10 text-gray-500">
        Note not found.{noteId}
      </div>
    );
  }

  const handleEditOpen = () => setEditModalOpen(true);
  const handleEditClose = () => setEditModalOpen(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      noteId,
      title: form.title,
      content: form.content,
      tags: form.tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean),
      isPinned: form.isPinned,
      isArchived: form.isArchived,
      isStarred: form.isStarred,
    };
    try {
      const res = await notesServices.updateNoteById(payload);
      if (res && res.success) {
        // Refetch the note to get the latest data from backend
        const updated = await notesServices.getNoteById(noteId);
        if (updated && updated.success && updated.note) {
          setNote(updated.note);
        }
        setEditModalOpen(false);
        toast.success("Note updated successfully");
      } else {
        toast.error(res?.message || "Failed to update note");
      }
    } catch {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        className="mb-6 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
        onClick={() => router.back()}
      >
        ← Back
      </button>
      <div className="bg-white rounded-2xl border-2 shadow p-6 relative">
        <button
          className="absolute top-4 right-4 p-2 bg-transparent text-gray-500 hover:text-yellow-600"
          onClick={handleEditOpen}
          aria-label="Edit Note"
        >
          <FaEdit size={20} />
        </button>
        <h1 className="text-3xl font-bold mb-4 text-yellow-900">
          {note.title}
        </h1>
        <div className="mb-4 text-gray-700 whitespace-pre-line text-lg">
          {note.content}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags &&
            note.tags.map((tag: string, i: number) => (
              <span
                key={i}
                className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex gap-4 mt-6">
          <span className="text-sm font-medium flex items-center gap-1">
            {note.isPinned ? (
              <span className="text-yellow-500">📌 Pinned</span>
            ) : (
              <span className="text-gray-400">Not Pinned</span>
            )}
          </span>
          <span className="text-sm font-medium flex items-center gap-1">
            {note.isStarred ? (
              <span className="text-yellow-400">★ Starred</span>
            ) : (
              <span className="text-gray-400">Not Starred</span>
            )}
          </span>
          <span className="text-sm font-medium flex items-center gap-1">
            {note.isArchived ? (
              <span className="text-orange-400">🗄️ Archived</span>
            ) : (
              <span className="text-gray-400">Not Archived</span>
            )}
          </span>
        </div>
      </div>
      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Note
            </h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isPinned"
                    checked={form.isPinned}
                    onChange={handleFormChange}
                  />
                  Pinned
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isStarred"
                    checked={form.isStarred}
                    onChange={handleFormChange}
                  />
                  Starred
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isArchived"
                    checked={form.isArchived}
                    onChange={handleFormChange}
                  />
                  Archived
                </label>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={handleEditClose}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailsPage;
