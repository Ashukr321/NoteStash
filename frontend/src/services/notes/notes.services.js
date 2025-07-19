const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;
import Cookies from 'js-cookie';
import toast from 'react-hot-toast'
const notesServices = {
  // 1. createNewNotes 
  async createNewNotes({ title, content, tags }) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      const response = await fetch(`${baseUrl}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, tags })
      })
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // 2 . getAllNotes
  async getAllNotes() {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      const response = await fetch(`${baseUrl}/api/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // 3. getNoteById
  async getNoteById(noteId) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      if (!noteId) {
        toast.error("Note ID is required!");
        return;
      }
      const response = await fetch(`${baseUrl}/api/notes/${noteId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // 4. deleteNoteById 
  async deleteNoteById(noteId) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      if (!noteId) {
        toast.error("Note ID is required!");
        return;
      }
      const response = await fetch(`${baseUrl}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // 5. toggleNotePinned
  async toggleNotePinned(isPinned, noteId) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      if (!noteId) {
        toast.error("Note ID is required!");
        return;
      }
      const response = await fetch(`${baseUrl}/api/notes/${noteId}/pin`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`

        },
        body: JSON.stringify({ isPinned: isPinned })
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // 6. toggleNoteStarred
  async toggleNoteStarred(isStarred, noteId) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      if (!noteId) {
        toast.error("Note ID is required!");
        return;
      }
      const response = await fetch(`${baseUrl}/api/notes/${noteId}/star`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`

          },
          body: JSON.stringify({ isStarred: isStarred })
        }
      );
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // 7. toggleNoteArchived 
  async toggleNoteArchived(isArchived, noteId) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      if (!noteId) {
        toast.error("Note ID is required!");
        return;
      }

      const response = await fetch(`${baseUrl}/api/notes/${noteId}/archive`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ isArchived: isArchived })
        }
      );

      const resData = await response.json();

      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // 8. updateNoteById
  async updateNoteById({ noteId, title, content, tags, isPinned, isArchived, isStarred } = {}) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");
        return;
      }
      if (!noteId) {
        toast.error("Note ID is required!");
        return;
      }
      // Build the payload with only provided fields
      const payload = {};
      if (title !== undefined) payload.title = title;
      if (content !== undefined) payload.content = content;
      if (tags !== undefined) payload.tags = tags;
      if (isPinned !== undefined) payload.isPinned = isPinned;
      if (isArchived !== undefined) payload.isArchived = isArchived;
      if (isStarred !== undefined) payload.isStarred = isStarred;

      const response = await fetch(`${baseUrl}/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      return resData;

    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}


export default notesServices;