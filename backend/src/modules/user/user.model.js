import mongoose from 'mongoose';

// create userSchema
const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    trim: true,
    required: [true, "UserName is required!"],
    minlength: [3, "UserName must be length 3 long character"]
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
    time: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [6, "Password must be at least 6 characters"]
  }
}, {
  timestamps: true
})

// create model 
const User = mongoose.model("User", userSchema);

// export user model
export default User;