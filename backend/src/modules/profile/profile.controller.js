import Profile from "./profile.model.js";
import createError from 'http-errors';
// create profile 
// All req body fields are optional, not required
const createProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    // create object Literals
    const profileData = { user: userId };

    if (req.body.bio !== undefined) profileData.bio = req.body.bio;
    if (req.body.dob !== undefined) profileData.dob = req.body.dob;
    if (req.body.location !== undefined) profileData.location = req.body.location;
    if (req.body.address !== undefined) profileData.address = req.body.address;
    if(req.body.pin_code!==undefined)profileData.pin_code= req.body.pin_code;
    // create profile with only provided fields
    const newProfile = await Profile.create(profileData);
    await newProfile.save();
    return res.status(200).json({ success:true, message: "Profile created successfully" });
  } catch (err) {
    return next(err);
  }
}

export { createProfile };