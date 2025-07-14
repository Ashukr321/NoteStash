import express from 'express'
import {createNotes,getAllNotes,getNoteById,deleteNote,togglePinNote,toggleStarredNote,addToArchive,updateNote} from './note.controller.js'
import isAuthenticate from '../../middlewares/authMiddleware.js';

// create router 
const router = express.Router();
// routes 
router.post('/',isAuthenticate,createNotes);
router.get('/',isAuthenticate,getAllNotes);
router.get('/:id',isAuthenticate,getNoteById);
router.put('/:id',isAuthenticate,updateNote);
router.delete('/:id',isAuthenticate,deleteNote);
router.patch('/:id/pin',isAuthenticate,togglePinNote);
router.patch('/:id/star',isAuthenticate,toggleStarredNote);
router.patch('/:id/archive',isAuthenticate,addToArchive);
// export routes
export default router;