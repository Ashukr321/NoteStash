import express from 'express'
import {createNotes,getAllNotes} from './note.controller.js'
import isAuthenticate from '../../middlewares/authMiddleware.js';

// create router 
const router = express.Router();
// routes 
router.post('/',isAuthenticate,createNotes)
router.get('/',isAuthenticate,getAllNotes)

// export routes
export default router;