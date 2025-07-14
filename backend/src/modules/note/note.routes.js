import express from 'express'
import {createNotes,getAllNotes,getNoteById,deleteNote,togglePinNote} from './note.controller.js'
import isAuthenticate from '../../middlewares/authMiddleware.js';

// create router 
const router = express.Router();
// routes 
router.post('/',isAuthenticate,createNotes);
router.get('/',isAuthenticate,getAllNotes);
router.get('/:id',isAuthenticate,getNoteById);
router.delete('/:id',isAuthenticate,deleteNote);
router.patch('/:id/pin',isAuthenticate,togglePinNote);

// export routes
export default router;