import express from 'express';
import { createProfile, getProfileDetails, updateProfileData, updateProfilePic } from './profile.controller.js'
const router = express.Router();
import isAuthenticate from '../../middlewares/authMiddleware.js';

// import multer 
import multer from 'multer'
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
    cb(null, Date.now() + "-" + file.originalname); // customize the fileName, Date.now() should be called as a function
  }
});

// now we have to initialize multer with storage 
const upload = multer({ storage: storage });

// create profile 
router.post('/', isAuthenticate, createProfile);
router.get('/me', isAuthenticate, getProfileDetails);
router.put('/update', isAuthenticate, updateProfileData);

// Update profile pic route with multer middleware
// Only update if file exists
router.patch(
  '/profile-pic',
  isAuthenticate,
  upload.single('profilePic'),
  updateProfilePic
);

export default router;