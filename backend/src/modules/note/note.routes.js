import express from 'express'
import {createNotes} from './note.controller.js'
import isAuthenticate from '../../middlewares/authMiddleware.js';

// create router 
const router = express.Router();
// routes 
router.post('/',isAuthenticate,createNotes)

// export routes
export default router;