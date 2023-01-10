import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add your name!"],
  },
  email: {
    type: String,
    required: [true, "Please add your email address!"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address!",
    ]
  },
  password: {
    type: String,
    required: [true, "Please add your password!"],
    minLength: [6, "Password length is at least 6 characters!"],
  },
  avatar: {
    type: String,
    required: [true, "Please add your avatar!"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  phone: {
    type: String,
    default: "Not available",
  },
  bio: {
    type: String,
    default: "Not available",
    maxLength: [250, "Your bio must not exceed 250 characters!"],
  },
}, {
  timestamps: true,
});

// Encrypt password before saving to DB
UserSchema.pre("save", async function(next) {
  // Skip hash if password wasn't modified
  if(!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
