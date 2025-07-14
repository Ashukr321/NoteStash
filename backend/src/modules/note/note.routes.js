import express from 'express'
import {createNotes,getAllNotes,getNoteById,deleteNote} from './note.controller.js'
import isAuthenticate from '../../middlewares/authMiddleware.js';

// create router 
const router = express.Router();
// routes 
router.post('/',isAuthenticate,createNotes);
router.get('/',isAuthenticate,getAllNotes);
router.get('/:id',isAuthenticate,getNoteById);
router.delete('/:id',isAuthenticate,deleteNote);

// export routes
export default router;