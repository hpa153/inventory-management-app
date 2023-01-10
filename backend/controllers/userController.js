import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";
import sendEmail from "../utils/sendEmail.js";

// Generate token for authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register a user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input:
  // Missing field
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields!");
  }

  // Email uniqueness
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("This email address has already been used!");
  }

  // Password length
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password length is at least 6 characters!");
  }

  // Create new user
  const newUser = await User.create({
    name,
    email,
    password,
  });

  // Generate token
  const token = generateToken(newUser._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
    sameSite: "none",
    secure: true,
  });

  if (newUser) {
    const { _id, name, email, avatar, phone, bio } = newUser;

    res.status(201).json({ _id, name, email, avatar, phone, bio, token });
  } else {
    res.status(400);
    throw new Error("Failure creating new user!");
  }
});

// login the user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  // Missing field
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all required fields!");
  }

  // Check user credential
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User does not exist!");
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (user && isCorrectPassword) {
    // Generate token
    const token = generateToken(user._id);

    // Send HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, avatar, phone, bio } = user;

    res.status(200).json({ _id, name, email, avatar, phone, bio, token });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials!");
  }
});

// Log user out
const logoutUser = asyncHandler(async (req, res) => {
  // Expire the cookie to log the user out
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // one day
    sameSite: "none",
    secure: true,
  });

  // Alternatively, remove the cookie: res.clearCookie("token");

  return res.status(200).json({ message: "User successfully logged out!" });
});

// Get user data
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, avatar, phone, bio } = user;

    res.status(201).json({ _id, name, email, avatar, phone, bio });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Get login status to handle frontend
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json(false);
  }

  // Verify the token
  const isVerified = jwt.verify(token, process.env.JWT_SECRET);

  if (isVerified) {
    return res.json(true);
  }

  return res.json(false);
});

// Update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const userToUpdate = await User.findById(req.user._id);

  if (userToUpdate) {
    const { _id, name, email, avatar, phone, bio } = userToUpdate;

    // Update profile while keeping email
    userToUpdate.email = email;
    userToUpdate.name = req.body.name || name;
    userToUpdate.phone = req.body.phone || phone;
    userToUpdate.bio = req.body.bio || bio;
    userToUpdate.avatar = req.body.avatar || avatar;

    const updatedUser = await userToUpdate.save();

    res.status(200).json({ 
      _id: userToUpdate._id, 
      name: userToUpdate.name, 
      email: userToUpdate.email, 
      avatar: userToUpdate.avatar, 
      phone: userToUpdate.phone, 
      bio: userToUpdate.bio });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Update user password
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { oldPassword, password, confirmedPassword } = req.body;

    // Validation:
    // Missing field
    if(!oldPassword || !password || !confirmedPassword) {
      res.status(400);
      throw new Error("Please fill in all required fields!");
    }

    // Correct old password
    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);

    if(isCorrectPassword) {
      // Mismatching new passwords
      if(password !== confirmedPassword) {
        res.status(400);
        throw new Error("Please make sure your passwords match each other!");
      }

      // Save new password
      user.password = password;

      await user.save();
    } else {
      res.status(400);
      throw new Error("Please make sure your password is correct!");
    }

    res.status(200).send("Successfully updated password!");
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

// Forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if(!user) {
    return res.status(404);
    throw new Error("User does not exist!");
  }

  // Delete existing token
  const token = await Token.findOne({ userId: user._id });

  if(token) {
    await token.deleteOne();
  }

  // Create reset token
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken)

  // Hash token before saving
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  // Save token to db
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * 60 * 1000 // 30 minutes
  }).save();

  // Reset url
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  // Reset email content
  const message = `
  <p>Hi ${user.name},</p>
  <p>Please use the below URL to reset your password.</p>
  <p>This URL expires in <b>30 minutes</b>.</p>

  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

  <p>Regards,</p>
  `;
  const subject = "Password Reset Request";
  const sendTo = user.email;
  const sendFrom = process.env.USER_EMAIL;

  try {
    await sendEmail(subject, message, sendTo, sendFrom);
    res.status(200).json({success: true, message: "Reset email sent"});
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again!");
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token and compare with token stored in DB
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  const userToken = await Token.findOne({ token: hashedToken, expiresAt: {$gt: Date.now()}});

  if(!userToken) {
    return res.status(404);
    throw new Error("Invalid token!");
  }

  // Find user and update password
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  user.save();

  res.status(200).json({message: "Successfully reset password!"});
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
};
