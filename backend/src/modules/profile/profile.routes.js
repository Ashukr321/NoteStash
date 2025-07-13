import express from 'express';
import { createProfile } from './profile.controller.js'
const router = express.Router();
import isAuthenticate from '../../middlewares/authMiddleware.js';


// create profile 
router.post('/', isAuthenticate, createProfile);


export default router;