import express from 'express';
import isAuthenticate from '../../middlewares/authMiddleware.js';
import { attachedFileToNote } from './file.controller.js';
const router = express.Router();
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// setup the temp storage 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); 
  }
});

// now we have to initialize multer with storage 
const upload = multer({ storage: storage });

router.post('/:noteId/upload', isAuthenticate,upload.single('noteFile'), attachedFileToNote);

// export file routes 
export default router;