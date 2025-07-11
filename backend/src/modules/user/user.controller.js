import User from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createError from 'http-errors';

//users business logics

//registerUser
const registerUser = async (req, res, next) => {
  try {
    const { UserName, email, password } = req.body;
    // validate request body
    if (!UserName) {
      const err = createError(400, "UserName can't be Empty!");
      return next(err);
    }

    if (!email) {
      const err = createError(400, "Email is Required!");
      return next(err);
    }

    if (!password) {
      const err = createError(400, "Password is Required!");
      return next(err);
    }

    // check userExists 
    const userExits = await User.findOne({ email: email });
    if (userExits) {
      const err = createError(400, "User already Exits!");
      return next(err);
    }

    // hash password 
    const hashPassword = await bcrypt.hash(password, 10);

    // create new User
    const newUser = await User.create({
      UserName: UserName,
      email: email,
      password: hashPassword
    })

    // save newUser 
    await newUser.save();
    return res.status(200).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};


//loginUser
const loginUser = async (req, res, next) => {
  return res.json({ message: "User logged in successfully" });
};

//changePassword
const changePassword = async (req, res, next) => {
  return res.json({ message: "Password changed successfully" });
};

//changeUserName
const changeUserName = async (req, res, next) => {
  return res.json({ message: "Username changed successfully" });
};

//deleteAccount
const deleteAccount = async (req, res, next) => {
  return res.json({ message: "Account deleted successfully" });
};


// exports all controllers 
export {
  registerUser,
  loginUser,
  changePassword,
  changeUserName,
  deleteAccount
};

