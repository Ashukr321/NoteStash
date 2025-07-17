import NoteFile from './file.model.js'
import cloudinary from '../../utils/cloudinary.js';
import fs from 'fs';
// attachedFileToNote 
const attachedFileToNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId;

    // Check if file exists
    if (!req.file) {
      const err = createError(400, "No file uploaded");
      return next(err);
    }

    const filePath = req.file.path;
    // Use a unique public_id to avoid conflicts and ensure proper file handling
    const timestamp = Date.now();
    const originalName = req.file.originalname ? req.file.originalname.split('.').slice(0, -1).join('.') : 'uploaded_file';
    const publicId = `${originalName}_${timestamp}`;

    // Try uploading as resource_type "raw" to ensure all file types are supported
    let result;
    try {
      result = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
        folder: "notes",
        public_id: publicId
      });
    } catch (err) {
      // Try as raw if auto fails
      try {
        result = await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
          folder: "notes",
          public_id: publicId
        });
      } catch (uploadErr) {
        return next(new Error("File upload failed on Cloudinary)"));
      }
    }

    // Check if secure_url is present
    if (!result || !result.secure_url) {

      return next(new Error("File uploaded but no secure URL returned from Cloudinary)"));
    }

    console.log(result);
    // Delete file locally
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      }
    });

    res.status(200).json({
      success: true,
      message: "File Attached to Note Successfully!",
      noteId: noteId,
      result: result,
    })

  } catch (error) {
    return next(error);
  }
}

export { attachedFileToNote };