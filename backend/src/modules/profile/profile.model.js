import mongoose from 'mongoose'

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  profilePic: {
    type: String
  },
  bio: {
    type: String
  },
  dob: {
    type: Date,
  },
  location: {
    type: String
  },
  address: {
    type: String
  },
  pin_code: {
    type: String,
  }
}, {
  timestamps: true
})

//create profile Model 
const Profile = mongoose.model("Profile", userProfileSchema);
export default Profile; 