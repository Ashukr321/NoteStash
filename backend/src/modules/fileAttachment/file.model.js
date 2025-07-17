
import mongoose from 'mongoose';

const noteFileSchema = new mongoose.Schema(
  {
    note: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    fileUrl: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number, // In bytes
      required: true,
    },

    storageProvider: {
      type: String,
      default: 'cloudinary',
    },
  },
  {
    timestamps: {
      createdAt: 'uploadedAt',
      updatedAt: false,
    },
  }
);

const NoteFile = mongoose.model('NoteFile', noteFileSchema);
export default NoteFile;
