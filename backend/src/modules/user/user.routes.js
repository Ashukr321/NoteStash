import express from 'express';
// auth middleware 
import isAuthenticate from '../../middlewares/authMiddleware.js';
import {
  registerUser,
  loginUser,
  changePassword,
  changeUserName,
  deleteAccount,
  getUserInfo
} from './user.controller.js'
const router = express.Router();
// routes 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-username', isAuthenticate, changeUserName);
router.get('/getuserinfo', isAuthenticate, getUserInfo);
router.put('/change-password', isAuthenticate, changePassword);
router.delete('/delete', isAuthenticate, deleteAccount);

export default router;