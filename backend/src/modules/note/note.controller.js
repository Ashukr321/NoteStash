import Notes from "./note.model.js";
import createError from 'http-errors'
// 1. create Notes 
const createNotes = async (req, res, next) => {
  try {
    const { title, content, isPinned, isArchived, isStarred, attachments, tags } = req.body;
    if (!title) {
      const err = createError(400, "Title is required!");
      return next(err);
    }
    if (!content) {
      const err = createError(400, "Content is required!");
      return next(err);
    }
    const userId = req.userId;
    const newNotesObject = {
      user: userId,
      title: title,
      content: content,
      ...(Array.isArray(tags) ? { tags } : {}),
      ...(typeof isPinned === "boolean" ? { isPinned } : {}),
      ...(typeof isArchived === "boolean" ? { isArchived } : {}),
      ...(typeof isStarred === "boolean" ? { isStarred } : {}),
      ...(Array.isArray(attachments) ? { attachments } : {}),
    };

    const newNotes = await Notes.create(newNotesObject);
    await newNotes.save();

    // toObject() => convert mongodb document to javascript object 
    const notesResponse = newNotes.toObject();
    delete notesResponse.user; // remove the user field from notes object

    return res.status(200).json({
      success: true,
      message: "Notes created successFully!",
      notes: notesResponse
    })
  } catch (error) {
    // error ko next middleware ko pass karo
    return next(error);
  }
}

// 2. getAllNotes 
const getAllNotes = async (req, res, next) => {
  try {
    const userId = req.userId;
    let { page = 1, limit = 10 } = req.query; // default values

    // Check userId
    if (!userId) {
      const err = createError(400, "UserId is Required!");
      return next(err);
    }


    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const skip = (page - 1) * limit;

    // Find notes for the user with pagination
    const allNotes = await Notes.find({ user: userId })
      .skip(skip)
      .limit(limit);

    // allNotes is an array, so we need to map over it to remove the user field from each note
    const notesResponse = allNotes.map(note => {
      const noteObj = note.toObject();
      delete noteObj.user;
      return noteObj;
    });
    // Get total count of notes for the user
    const totalNotes = await Notes.countDocuments({ user: userId });
    const totalNumberOfPage = Math.ceil(totalNotes / limit);

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully!",
      notes: notesResponse,
      page: page,
      limit: limit,
      totalNotes: totalNotes,
      totalNumberOfPage: totalNumberOfPage
    });

  } catch (error) {
    return next(error);
  }
}

// 3. getNoteById
const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
      const err = createError(400, "Note Id is required! (Note Id jaruri hai)");
      return next(err);
    }
    const note = await Notes.findOne({ _id: id, user: userId });

    const noteResponse = note.toObject();
    delete noteResponse.user;

    if (!note) {
      const err = createError(404, "Note not found or access denied! (");
      return next(err);
    }
    return res.status(200).json({
      success: true,
      message: "Note fetched successfully!",
      note: noteResponse
    });
  } catch (error) {
    return next(error);
  }
}

// 4.deleteNote 
const deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
      // English + Hindi
      const err = createError(400, "Note id is required!");
      return next(err);
    }
    // Find the note and check ownership
    const note = await Notes.findOne({ _id: id, user: userId });
    if (!note) {
      const err = createError(404, "Note not found or access denied! ");
      return next(err);
    }
    await Notes.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Note deleted successfully!"
    });
  } catch (error) {
    return next(error);
  }
}

// 5. togglePinNote
const togglePinNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPinned } = req.body;
    const userId = req.userId;

    // Check if note id is provided
    if (!id) {
      const err = createError(400, "Note Id is required!");
      return next(err);
    }

    // Find the note and check ownership
    const note = await Notes.findOne({ _id: id, user: userId });
    if (!note) {
      const err = createError(404, "Note not found or access denied!");
      return next(err);
    }

    // Update the isPinned status
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: { isPinned: isPinned } },
      { new: true }
    );

    const updatedNoteResponse = updatedNote.toObject();
    delete updatedNoteResponse.user;

    return res.status(200).json({
      success: true,
      message: "Note pin status updated successfully!",
      note: updatedNoteResponse
    });

  } catch (error) {
    return next(error);
  }
}

// 6 toggleStarredNote
const toggleStarredNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isStarred } = req.body;
    const userId = req.userId;

    // Check if note id is provided
    if (!id) {
      const err = createError(400, "Note Id is required!");
      return next(err);
    }

    // Find the note and check ownership
    const note = await Notes.findOne({ _id: id, user: userId });
    if (!note) {
      const err = createError(404, "Note not found or access denied!");
      return next(err);
    }

    // Update the isStarred status
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: { isStarred: isStarred } },
      { new: true }
    );
    const updatedNoteResponse = updatedNote.toObject();
    delete updatedNoteResponse.user;

    return res.status(200).json({
      success: true,
      message: "Note starred status updated successfully!",
      note: updatedNoteResponse,
    })
  } catch (error) {
    return next(error)
  }
}

//  7 .addToArchive
const addToArchive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isArchived } = req.body;
    const userId = req.userId;

    // Check if note id is provided
    if (!id) {
      const err = createError(400, "Note Id is required!");
      return next(err);
    }

    // Find the note and check ownership
    const note = await Notes.findOne({ _id: id, user: userId });
    if (!note) {
      const err = createError(404, "Note not found or access denied!");
      return next(err);
    }

    // Update the isStarred status
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: { isArchived: isArchived } },
      { new: true }
    );
    const updatedNoteResponse = updatedNote.toObject();
    delete updatedNoteResponse.user;

    return res.status(200).json({
      success: true,
      message: "Note starred status updated successfully!",
      note: updatedNoteResponse,
    })
  } catch (error) {
    return next(error)
  }
}

// 8 .update note 
const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const {
      title,
      content,
      tags,
      isPinned,
      isArchived,
      isStarred,
    } = req.body;

    // Check note ownership
    const note = await Notes.findOne({ _id: id, user: userId });
    if (!note) {
      const err = createError(404, "Note not found or access denied!");
      return next(err);
    }

    // Prepare update object
    const updateNoteObject = {};
    if (title !== undefined) updateNoteObject.title = title;
    if (content !== undefined) updateNoteObject.content = content;
    if (tags !== undefined) updateNoteObject.tags = tags;
    if (isPinned !== undefined) updateNoteObject.isPinned = isPinned;
    if (isArchived !== undefined) updateNoteObject.isArchived = isArchived;
    if (isStarred !== undefined) updateNoteObject.isStarred = isStarred;
    // Update the note
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateNoteObject },
      { new: true }
    );

    if (!updatedNote) {
      const err = createError(500, "Failed to update note!");
      return next(err);
    }

    const updatedNoteResponse = updatedNote.toObject();
    delete updatedNoteResponse.user;

    return res.status(200).json({
      success: true,
      message: "Note updated successfully!",
      note: updatedNoteResponse
    });
  } catch (error) {
    return next(error);
  }
}


export { createNotes, getAllNotes, getNoteById, deleteNote, togglePinNote, toggleStarredNote, addToArchive, updateNote }

