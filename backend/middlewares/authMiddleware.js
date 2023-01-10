import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

const authUser = asyncHandler(async (req, res, next) => {
  try {
    // Check if user is logged in
    const token = req.cookies.token;

    if(!token) {
      res.status(401);
      throw new Error("You're not authorized, please log in!");
    }

    // Verify the token
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from the token
    const user = await User.findById(isVerified.id).select("-password");

    if(!user) {
      res.status(401);
      throw new Error("User not found!");
    }

    // Set user from request to the user from db
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("You're not authorized, please log in!");
  }
});

export default authUser;
