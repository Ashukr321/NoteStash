import express from 'express';
import {
  registerUser,
  loginUser,
  changePassword,
  changeUserName,
  deleteAccount
} from './user.controller.js'
const router = express.Router();
// routes 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-password', changePassword);
router.put('/change-username', changeUserName);
router.delete('/delete', deleteAccount);

export default router;