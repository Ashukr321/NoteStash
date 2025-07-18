
import Profile from "./profile.model.js";
import createError from 'http-errors';
import cloudinary from "../../utils/cloudinary.js";
import fs from 'fs';
import User from '../user/user.model.js'

// create profile 
const createProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    // create object Literals
    const profileData = { user: userId };
    // check userProfile already exits 
    const exitsUserProfile = await Profile.findOne({ user: userId });
    if (exitsUserProfile) {
      const err = createError(400, "User Profile Already Exits!");
      return next(err);
    }

    if (req.body.bio !== undefined) profileData.bio = req.body.bio;
    if (req.body.dob !== undefined) profileData.dob = req.body.dob;
    if (req.body.location !== undefined) profileData.location = req.body.location;
    if (req.body.address !== undefined) profileData.address = req.body.address;
    if (req.body.pin_code !== undefined) profileData.pin_code = req.body.pin_code;
    // create profile with only provided fields
    const newProfile = await Profile.create(profileData);
    await newProfile.save();
    return res.status(200).json({ success: true, message: "Profile created successfully" });
  } catch (err) {
    return next(err);
  }
}



const getProfileDetails = async (req, res, next) => {
  try {
 
    const userId =await req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found in request."
      });
    } 

    // Fetch user details, exclude password
    const user = await User.findById(userId).select("-password");
    if (!user) {
     
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    // Try to fetch profile data
    const profileData = await Profile.findOne({ user: userId }).lean().select("-user");

    if (!profileData) {
      return res.status(200).json({
        success: true,
        message: "Profile not found for this user!",
        data: {
          userName: user.UserName,
          email: user.email
        }
      });
    }


    // Merge userName and email into response if profile exists
    return res.status(200).json({
      success: true,
      message: "Profile data fetched successfully!",
      data: {
        ...profileData,
        userName: user.UserName,
        email: user.email
      }
    });

  } catch (error) {
    return next(error);
  }
}

// updateProfileData 
const updateProfileData = async (req, res, next) => {
  try {
    const { bio, dob, location, address, pin_code } = req.body;

    // get userId and check UserProfile Exist or not
    const userId = req.userId;

    // create profileDataObject 
    const updatedProfileData = {};
    if (req.body.bio !== undefined) updatedProfileData.bio = req.body.bio;
    if (req.body.dob !== undefined) updatedProfileData.dob = req.body.dob;
    if (req.body.location !== undefined) updatedProfileData.location = req.body.location;
    if (req.body.dob !== pin_code) updatedProfileData.pin_code = req.body.pin_code;
    if (req.body.dob !== address) updatedProfileData.address = req.body.address;
    // update profile 
    const updateProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: updatedProfileData },
      { new: true }
    )
    return res.status(200).json({
      success: true,
      message: "Profile Update SuccessFully!",
      profile: updateProfile
    })
  } catch (error) {
    return next(err);
  }
}

// updateProfilePic
const updateProfilePic = async (req, res, next) => {
  try {
    const userId = req.userId;
    // Check if file exists
    if (!req.file) {
      const err = createError(400, "No file uploaded");
      return next(err);
    }

    // Get file path
    const filePath = req.file.path;
    const folderPath = 'noteStash_profile_pic_storage';

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderPath,
      public_id: `${userId}_profile`,
      overwrite: true,
      resource_type: "image"
    });

    // Set the profilePic URL in the main DB (Profile collection)
    await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { profilePic: result.secure_url } },
      { new: true }
    );

    // Delete file locally
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Profile Pic Updated Successfully! ",
      profilePic: result.secure_url
    });
  } catch (error) {
    return next(error);
  }
}

export { createProfile, getProfileDetails, updateProfileData, updateProfilePic };