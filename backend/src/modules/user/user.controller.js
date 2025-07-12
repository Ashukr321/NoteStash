import User from "./user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createError from 'http-errors';
import envConfig from "../../config/envConfig.js";
import { create } from "domain";
import { userInfo } from "os";
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

    // we have to check password 
    const verifyPassword = await bcrypt.compare(password, userExits.password);
    if (!verifyPassword) {
      const err = createError(400, "Password is Invalid!");
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
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    // validation check
    if (!currentPassword) {
      const err = createError(400, "currentPassword is Required!");
      return next(err);
    }
    if (!newPassword) {
      const err = createError(400, "newPassword is Required!");
      return next(err);
    }
    if (!confirmNewPassword) {
      const err = createError(400, "confirmPassword is Required!");
      return next(err);
    }

    // check newPassword === confirmPassword or not 
    if (newPassword !== confirmNewPassword) {
      const err = createError(400, "Password doesn't match");
      return next(err);
    }

    // get User 
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      const err = createError(400, "User doesn't Exist");
      return next(err);
    }

    // Check if current password is correct
    const verifyPassword = await bcrypt.compare(currentPassword, user.password);
    if (!verifyPassword) {
      const err = createError(400, "Current password doesn't match");
      return next(err);
    }


    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword; // FIX: assign, not await
    await user.save();

    return res.json({
      message: "Password changed successfully "
    });
  } catch (error) {
    return next(error);
  }
};



//deleteAccount
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userExits = User.findById(userId);
    if (!userExits) {
      const err = createError(400, "User Does't exits");
      return next(err);
    }
    await User.deleteOne(userExits);
    return res.json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    return next(error)
  }
};


// exports all controllers 
export {
  registerUser,
  loginUser,
  changePassword,
  changeUserName,
  deleteAccount
};

