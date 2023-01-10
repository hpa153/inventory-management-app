import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import authUser from "../middlewares/authMiddleware.js";

const router = express.Router();

// register user
router.post("/register", registerUser);

// login + logout user
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Get user data
router.get("/get-user", authUser, getUser);

router.get("/login-status", loginStatus);

// Update user profile
router.patch("/update-profile", authUser, updateProfile);
router.patch("/update-password", authUser, updatePassword);

// Reset password
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resetToken", resetPassword);

export default router;
