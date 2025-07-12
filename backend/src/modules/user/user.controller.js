import User from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import envConfig from "../../config/envConfig.js";
import { create } from "domain";
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
  try {
    const { email, password } = req.body;
    // validate 
    if (!email) {
      const err = createError(400, "Email is Required!");
      return next(err);
    }
    if (!password) {
      const err = createError(400, "Password is Required!");
      return next(err);
    }
    // userExits 
    const userExits = await User.findOne({ email: email });
    if (!userExits) {
      const err = createError(400, "User does't Exists");
      return next(err);
    }
    // create token 
    const token = jwt.sign({ userId: userExits._id }, envConfig.jwt_secret, {
      expiresIn: envConfig.jwt_expire_time
    })
    // response
    return res.status(200).json({
      success: true,
      message: "Login SuccessFully!",
      token: token
    })
  } catch (error) {
    next(error);
  }

};

//changeUserName
const changeUserName = async (req, res, next) => {
  try {
    const { UserName } = req.body;
    // validate 
    if (!UserName) {
      const err = createError(400, "UserName is Required!");
      return next(err);
    }

    // findUser
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      const err = createError(400, "User Does't Exists");
      return next(err);
    }
    user.UserName = UserName;
    await user.save();
    return res.json({ success: true, message: "Username changed successfully" });
  } catch (error) {
    return next(error);
  }
};

//changePassword
const changePassword = async (req, res, next) => {
  return res.json({ message: "Password changed successfully" });
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

